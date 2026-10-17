import { createInterface } from "node:readline/promises";
import { execFileSync, execSync, spawnSync } from "node:child_process";
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

const tag = `v${version}`;
const existingTag = spawnSync("git", ["rev-parse", "--verify", "--quiet", `refs/tags/${tag}`], {
	cwd: root,
	stdio: "ignore",
});
if (existingTag.error) {
	throw existingTag.error;
}
if (existingTag.status === 0) {
	throw new Error(`Tag ${tag} already exists locally.`);
}
if (existingTag.status !== 1) {
	throw new Error("Unable to check whether the release tag already exists.");
}

console.log(`Creating and pushing ${tag}, then publishing to npm.`);
execFileSync("git", ["tag", "-a", tag, "-m", tag], {
	cwd: root,
	stdio: "inherit",
});
execFileSync("git", ["push"], { cwd: root, stdio: "inherit" });
execFileSync("git", ["push", "origin", tag], { cwd: root, stdio: "inherit" });
execSync("pnpm run push-npm", { cwd: root, stdio: "inherit" });
