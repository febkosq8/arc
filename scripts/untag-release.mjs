import { execFileSync } from "node:child_process";
import { createInterface } from "node:readline/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const runGit = (args) => execFileSync("git", args, { cwd: root, encoding: "utf8" }).trim();

const localTags = runGit(["tag", "--list", "v*"])
	.split(/\r?\n/)
	.filter(Boolean);
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
const version = (await prompt.question("Release version to untag (for example, 1.2.3): ")).trim();
prompt.close();

if (!/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?$/.test(version)) {
	throw new Error(`Invalid release version: ${version}`);
}

const tag = `v${version}`;

console.log(`Arc ${version} untag commands (review and run manually):\n`);
console.log(`git tag --delete ${tag}`);
console.log(`git push origin --delete ${tag}`);
console.log("\nIf a GitHub Release was created for this tag, delete it manually from GitHub Releases.");
