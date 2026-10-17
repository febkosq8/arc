import packageJson from "../package.json";
import { addons } from "storybook/manager-api";
import { create, themes } from "storybook/theming";

addons.setConfig({
	theme: create({
		...themes.dark,
		brandTitle: `Arc v${packageJson.version}`,
	}),
});
