import { addons } from "storybook/manager-api";
import { dark, light } from "./theme";

const prefersLight = window.matchMedia?.("(prefers-color-scheme: light)").matches;

addons.setConfig({
	theme: prefersLight ? light : dark,
});
