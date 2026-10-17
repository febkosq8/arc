import { create } from "storybook/theming";

import packageJson from "../package.json";

const fontBase = "ui-sans-serif, system-ui, sans-serif";
const fontCode = "ui-monospace, SFMono-Regular, Menlo, monospace";

const shared = {
	fontBase,
	fontCode,
	brandTitle: `Arc <span style="margin-left:6px;font:500 11px ${fontCode};opacity:.55">v${packageJson.version}</span>`,
	brandUrl: "https://www.npmjs.com/package/@febkosq8/arc",
	brandTarget: "_blank",
	appBorderRadius: 6,
	inputBorderRadius: 6,
} as const;

export const dark = create({
	...shared,
	base: "dark",
	colorPrimary: "#f97316",
	colorSecondary: "#f97316",
	appBg: "#202329",
	appContentBg: "#202329",
	appHoverBg: "#292e35",
	appPreviewBg: "#202329",
	appBorderColor: "#454a53",
	textColor: "#fafafa",
	textInverseColor: "#1f2937",
	textMutedColor: "#a3a3a3",
	barBg: "#292e35",
	barTextColor: "#a3a3a3",
	barHoverColor: "#fafafa",
	barSelectedColor: "#f97316",
	buttonBg: "#30353d",
	buttonBorder: "#454a53",
	booleanBg: "#292e35",
	booleanSelectedBg: "#3a2415",
	inputBg: "#292e35",
	inputBorder: "#454a53",
	inputTextColor: "#fafafa",
});

export const light = create({
	...shared,
	base: "light",
	colorPrimary: "#ea580c",
	colorSecondary: "#ea580c",
	appBg: "#f0f1f3",
	appContentBg: "#f0f1f3",
	appHoverBg: "#e5e7eb",
	appPreviewBg: "#f0f1f3",
	appBorderColor: "#cfd3da",
	textColor: "#1f2937",
	textInverseColor: "#fafafa",
	textMutedColor: "#525a66",
	barBg: "#ffffff",
	barTextColor: "#525a66",
	barHoverColor: "#1f2937",
	barSelectedColor: "#ea580c",
	buttonBg: "#ffffff",
	buttonBorder: "#cfd3da",
	booleanBg: "#e5e7eb",
	booleanSelectedBg: "#ffffff",
	inputBg: "#ffffff",
	inputBorder: "#cfd3da",
	inputTextColor: "#1f2937",
});
