import { createInterface } from "node:readline/promises";
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

console.log(`Arc ${version} release commands (review and run manually):\n`);
console.log(`git tag -a ${tag} -m "${tag}"`);
console.log("git push");
console.log(`git push origin ${tag}`);
console.log("pnpm run push-npm");
console.log(`\nIf npm requires an authenticator code, run: pnpm run push-npm -- --otp=YOUR_6_DIGIT_CODE`);
console.log("If npm opens a browser authentication flow, complete it in the terminal, then rerun the publish command.");
