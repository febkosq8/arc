import { createInterface } from "node:readline/promises";

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
