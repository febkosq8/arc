import { execFileSync, execSync } from "node:child_process";
import { createInterface } from "node:readline/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const runGit = (args) => execFileSync("git", args, { cwd: root, encoding: "utf8" }).trim();

console.log("Refreshing and pruning tags against origin...");
runGit(["fetch", "origin", "--prune", "--prune-tags"]);

const localTags = runGit(["tag", "--list", "v*"]).split(/\r?\n/).filter(Boolean);
const remoteTags = runGit(["ls-remote", "--tags", "--refs", "origin", "v*"])
	.split(/\r?\n/)
	.filter(Boolean)
	.map((line) => line.split(/\s+/)[1].replace("refs/tags/", ""));

console.log("Current release tags:");
console.log(`  Local: ${localTags.length ? localTags.join(", ") : "(none)"}`);
console.log(`  origin: ${remoteTags.length ? remoteTags.join(", ") : "(none)"}`);

const prompt = createInterface({
	input: process.stdin,
	output: process.stdout,
});
const inputVersion = (await prompt.question("Release version to unpublish (for example, 0.8.1 or v0.8.1): ")).trim();
prompt.close();

const version = inputVersion.startsWith("v") ? inputVersion.slice(1) : inputVersion;
if (!/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?$/.test(version)) {
	throw new Error(`Invalid release version: ${inputVersion}`);
}

let npmUser;
try {
	const npmWhoamiCommand =
		process.platform === "win32"
			? "npm.cmd whoami --registry=https://registry.npmjs.org"
			: "npm whoami --registry=https://registry.npmjs.org";
	npmUser = execSync(npmWhoamiCommand, { cwd: root, encoding: "utf8" }).trim();
} catch (error) {
	const output = [error.stderr, error.stdout, error.message].filter(Boolean).map(String).join("\n");
	if (/E(?:401|NEEDAUTH)|401 Unauthorized|need auth/i.test(output)) {
		console.log("\nnpm login is required before running the unpublish command.");
		console.log("Run: npm login --registry=https://registry.npmjs.org");
	} else {
		throw new Error(`Could not check npm login status:\n${output}`, { cause: error });
	}
}

if (npmUser) {
	console.log(`\nnpm is logged in as ${npmUser}.`);
}

const tag = `v${version}`;
const commands = [
	...(npmUser ? [] : ["npm login --registry=https://registry.npmjs.org"]),
	...(remoteTags.includes(tag) ? [`git push origin --delete ${tag}`] : []),
	...(localTags.includes(tag) ? [`git tag --delete ${tag}`] : []),
	`npm unpublish @febkosq8/arc@${version}`,
];

console.log(`Arc ${version} unpublish commands (review and run manually):\n`);
console.log(commands.join(" && "));
console.log("\nIf a GitHub Release was created for this tag, delete it manually from GitHub Releases.");
