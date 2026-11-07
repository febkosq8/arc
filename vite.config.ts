import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "node:path";
import { defineConfig } from "vite";
import dts from "unplugin-dts/vite";
import config from "./package.json" with { type: "json" };
export default defineConfig({
	plugins: [
		react(),
		tailwindcss(),
		dts({
			include: ["components/", "utilities/", "index.ts"],
		}),
	],
	resolve: {
		tsconfigPaths: true,
	},

	build: {
		lib: {
			entry: resolve("index.ts"),
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
