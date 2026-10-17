import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import tailwindcss from "@tailwindcss/postcss";
import { defineConfig } from "vite";
import dts from "unplugin-dts/vite";
import config from "./package.json" with { type: "json" };
export default defineConfig({
	plugins: [
		react(),
		dts({
			include: ["components/"],
		}),
	],
	resolve: {
		tsconfigPaths: true,
	},
	css: {
		postcss: {
			plugins: [tailwindcss],
		},
	},

	build: {
		lib: {
			entry: resolve("components", "index.ts"),
			formats: ["es"],
		},

		rollupOptions: {
			external: (id) =>
				[...Object.keys(config.peerDependencies), ...Object.keys(config.dependencies)].some(
					(pkg) => id === pkg || id.startsWith(`${pkg}/`),
				),
			output: {
				globals: {
					react: "React",
				},
			},
		},
	},
});
