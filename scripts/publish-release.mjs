import { createInterface } from "node:readline/promises";
import { execFileSync, spawnSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const packageJson = JSON.parse(await readFile(resolve(root, "package.json"), "utf8"));

let version = packageJson.version;
if (typeof version !== "string" || version.trim() === "") {
	const prompt = createInterface({
		input: process.stdin,
		output: process.stdout,
	});
	version = (await prompt.question("Release version (for example, 1.2.3): ")).trim();
	prompt.close();
}

if (!/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?$/.test(version)) {
	throw new Error(`Invalid release version: ${version}`);
}
if (typeof packageJson.name !== "string" || packageJson.name === "") {
	throw new Error("package.json must define a package name before publishing.");
}

const tag = `v${version}`;
const tagRef = `refs/tags/${tag}`;
const packageSpec = `${packageJson.name}@${version}`;
const localTag = spawnSync("git", ["rev-parse", "--verify", "--quiet", tagRef], {
	cwd: root,
	stdio: "ignore",
});
if (localTag.error) {
	throw localTag.error;
}
if (localTag.status !== 0 && localTag.status !== 1) {
	throw new Error("Unable to check whether the release tag already exists.");
}
const localTagExists = localTag.status === 0;
const previousTagSha = localTagExists ? gitOutput(["rev-parse", tagRef]) : null;
const previousTagTarget = localTagExists ? gitOutput(["rev-parse", `${tagRef}^{commit}`]) : null;
const previousTagType = localTagExists ? gitOutput(["cat-file", "-t", tagRef]) : null;

const branch = gitOutput(["branch", "--show-current"]);
if (branch === "") {
	throw new Error("Check out a branch before publishing a release.");
}

const upstream = gitOutput([
	"for-each-ref",
	"--format=%(upstream:remotename)%09%(upstream:remoteref)",
	`refs/heads/${branch}`,
]).split("\t");
const remote = upstream[0];
const branchRef = upstream[1];
if (!remote || !branchRef?.startsWith("refs/heads/")) {
	throw new Error(`Branch ${branch} must have an upstream branch before publishing.`);
}

const headSha = gitOutput(["rev-parse", "HEAD"]);
const branchBefore = remoteRefSha(remote, branchRef);
if (remoteRefSha(remote, tagRef) !== null) {
	throw new Error(`Tag ${tag} already exists on ${remote}; no release changes were made.`);
}

const npmVersionExists = checkNpmVersion(packageSpec);
if (npmVersionExists) {
	throw new Error(`npm version ${packageSpec} already exists; no release changes were made.`);
}

let localTagCreated = false;
let localTagRetargeted = false;
let tagObjectSha = previousTagSha;
let branchPushAttempted = false;
let tagPushAttempted = false;
let npmPublishAttempted = false;

try {
	console.log(`Creating and pushing ${tag}, then publishing ${packageSpec}.`);
	if (localTagExists && (previousTagTarget !== headSha || previousTagType !== "tag")) {
		console.log(`Retargeting the local ${tag} to the current release commit.`);
		execFileSync("git", ["tag", "-f", "-a", tag, "-m", tag, headSha], {
			cwd: root,
			stdio: "inherit",
		});
		localTagRetargeted = true;
	} else if (!localTagExists) {
		execFileSync("git", ["tag", "-a", tag, "-m", tag, headSha], {
			cwd: root,
			stdio: "inherit",
		});
		localTagCreated = true;
	}
	tagObjectSha = gitOutput(["rev-parse", tagRef]);

	if (branchBefore !== headSha) {
		branchPushAttempted = true;
		execFileSync("git", ["push", "--no-follow-tags", remote, `${headSha}:${branchRef}`], {
			cwd: root,
			stdio: "inherit",
		});
	}

	tagPushAttempted = true;
	execFileSync("git", ["push", "--no-follow-tags", remote, `${tagRef}:${tagRef}`], {
		cwd: root,
		stdio: "inherit",
	});

	npmPublishAttempted = true;
	const publish = runCommand("pnpm", ["run", "push-npm"]);
	printOutput(publish);
	if (publish.status !== 0) {
		throw new Error(`npm publishing failed with exit code ${publish.status ?? "unknown"}.`);
	}
	console.log(`Successfully published ${packageSpec}.`);
} catch (error) {
	console.error("Release failed; rolling back changes made by this run.");
	const rollbackErrors = [];

	if (npmPublishAttempted) {
		tryRollback(rollbackErrors, "npm publication", () => {
			if (!checkNpmVersion(packageSpec)) return;
			const unpublish = runCommand("npm", ["unpublish", packageSpec, "--force"]);
			printOutput(unpublish);
			if (unpublish.status !== 0) {
				throw new Error(`npm unpublish exited with code ${unpublish.status ?? "unknown"}.`);
			}
			console.log(`Unpublished ${packageSpec}.`);
		});
	}

	if (tagPushAttempted) {
		tryRollback(rollbackErrors, `remote tag ${tag}`, () => {
			const remoteTagSha = remoteRefSha(remote, tagRef);
			if (remoteTagSha === null) return;
			if (tagObjectSha === null || remoteTagSha !== tagObjectSha) {
				throw new Error(`Remote tag ${tag} no longer points to the object created by this run.`);
			}
			execFileSync("git", ["push", `--force-with-lease=${tagRef}:${tagObjectSha}`, remote, `:${tagRef}`], {
				cwd: root,
				stdio: "inherit",
			});
		});
	}

	if (branchPushAttempted) {
		tryRollback(rollbackErrors, `remote branch ${branchRef}`, () => {
			const remoteBranchSha = remoteRefSha(remote, branchRef);
			if (remoteBranchSha === branchBefore) return;
			if (remoteBranchSha !== headSha) {
				throw new Error(`Remote branch ${branchRef} changed since this run pushed it; leaving it untouched.`);
			}
			const lease = `--force-with-lease=${branchRef}:${headSha}`;
			const refspec = branchBefore === null ? `:${branchRef}` : `${branchBefore}:${branchRef}`;
			execFileSync("git", ["push", lease, remote, refspec], {
				cwd: root,
				stdio: "inherit",
			});
		});
	}

	if (localTagCreated) {
		tryRollback(rollbackErrors, `local tag ${tag}`, () => {
			const currentTagSha = localRefSha(tagRef);
			if (currentTagSha === null) return;
			if (tagObjectSha !== null && currentTagSha !== tagObjectSha) {
				throw new Error(`Local tag ${tag} changed since this run created it; leaving it untouched.`);
			}
			execFileSync("git", ["tag", "-d", tag], { cwd: root, stdio: "inherit" });
		});
	}
	if (localTagRetargeted) {
		tryRollback(rollbackErrors, `original local tag ${tag}`, () => {
			const currentTagSha = localRefSha(tagRef);
			if (currentTagSha === previousTagSha) return;
			if (currentTagSha !== tagObjectSha) {
				throw new Error(`Local tag ${tag} changed since this run retargeted it; leaving it untouched.`);
			}
			execFileSync("git", ["update-ref", tagRef, previousTagSha, tagObjectSha], {
				cwd: root,
				stdio: "inherit",
			});
		});
	}

	if (rollbackErrors.length > 0) {
		console.error("Rollback was incomplete:");
		for (const rollbackError of rollbackErrors) {
			console.error(`- ${rollbackError}`);
		}
	}
	console.error(error);
	process.exitCode = 1;
}

function gitOutput(args) {
	return execFileSync("git", args, {
		cwd: root,
		encoding: "utf8",
		stdio: ["ignore", "pipe", "inherit"],
	}).trim();
}

function remoteRefSha(remoteName, ref) {
	const output = execFileSync("git", ["ls-remote", remoteName, ref], {
		cwd: root,
		encoding: "utf8",
		stdio: ["ignore", "pipe", "inherit"],
	});
	const entry = output.split(/\r?\n/).find((line) => line.split(/\s+/)[1] === ref);
	return entry?.split(/\s+/)[0] ?? null;
}

function localRefSha(ref) {
	const result = spawnSync("git", ["rev-parse", "--verify", "--quiet", ref], {
		cwd: root,
		encoding: "utf8",
	});
	if (result.error) throw result.error;
	if (result.status === 1) return null;
	if (result.status !== 0) throw new Error(`Unable to inspect local ref ${ref}.`);
	return result.stdout.trim();
}

function checkNpmVersion(spec) {
	const result = runCommand("npm", ["view", spec, "version", "--json"]);
	if (result.status === 0) return true;
	if (/\bE404\b|404 Not Found/i.test(`${result.stdout}\n${result.stderr}`)) return false;
	throw new Error(`Unable to check npm version ${spec}:\n${result.stderr || result.stdout}`);
}

function runCommand(command, args) {
	const result = spawnSync(command, args, {
		cwd: root,
		encoding: "utf8",
		shell: process.platform === "win32",
	});
	if (result.error) throw result.error;
	return result;
}

function printOutput(result) {
	if (result.stdout) process.stdout.write(result.stdout);
	if (result.stderr) process.stderr.write(result.stderr);
}

function tryRollback(errors, label, action) {
	try {
		action();
	} catch (rollbackError) {
		errors.push(`${label}: ${rollbackError.message}`);
	}
}
