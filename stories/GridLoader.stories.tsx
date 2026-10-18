import type { Meta, StoryObj } from "@storybook/react-vite";
import { GridLoader } from "../components";

const meta = {
	title: "Components/GridLoader",
	component: GridLoader,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component: "A theme-aware grid loading indicator with configurable rows, columns, and size.",
			},
		},
	},
	argTypes: {
		rows: {
			control: { type: "number", min: 1, max: 12, step: 1 },
			description: "Number of rows in the animated grid.",
			table: { defaultValue: { summary: "3" } },
		},
		columns: {
			control: { type: "number", min: 1, max: 12, step: 1 },
			description: "Number of columns in the animated grid.",
			table: { defaultValue: { summary: "3" } },
		},
		size: {
			control: { type: "number", min: 16, step: 8 },
			description: "Width and height of the grid in pixels.",
			table: { defaultValue: { summary: "120" } },
		},
		maxSize: {
			control: { type: "number", min: 1, step: 1 },
			description: "Maximum width and height of an individual dot in pixels.",
			table: { defaultValue: { summary: "24" } },
		},
		label: {
			control: "text",
			description: "Accessible loading status announced to assistive technology.",
			table: { defaultValue: { summary: "Loading" } },
		},
		symbols: {
			control: "object",
			description: "Text or symbols displayed inside each cell; the cells shuffle these while loading.",
			table: { defaultValue: { summary: "25 text emoticons" } },
		},
	},
	args: {
		rows: 3,
		columns: 3,
		size: 120,
		maxSize: 24,
		label: "Loading",
		symbols: [
			"(,,> ᴗ <,,)",
			"≽^•⩊•^≼",
			"(╥﹏╥)",
			"(˶ᵔ ᵕ ᵔ˶)",
			"•⩊•",
			"˚₊‧꒰ა ₍ᐢ.  ̫.ᐢ₎ ໒꒱ ‧₊˚",
			"٩(ˊᗜˋ )و",
			"(≧◡≦)",
			"⸜(｡˃ ᵕ ˂ )⸝♡",
			"(˶˃⤙˂˶)",
			"（˶′◡‵˶）",
			"(＾▽＾)",
			"˚₊‧꒰ა.  .໒꒱ ‧₊˚",
			"( ˶ˆᗜˆ˵ )",
			"⊹ ₊  ⁺‧₊˚ ♡ ପ(๑•ᴗ•๑)ଓ ♡˚₊‧⁺ ₊ ⊹",
			"(つ﹏⊂)",
			"ʕ•̫͡•ʕ•̫͡•ʔ•̫͡•ʔ•̫͡•ʕ•̫͡•ʔ•̫͡ʕ•̫͡•ʕ•̫͡•ʔ•̫͡ʔ•̫͡•",
			"（´・｀ ）♡",
			"(╥_╥)",
			"(♡ˊ͈ ꒳ ˋ͈)",
			"(⸝⸝๑  ̫ ๑⸝⸝⸝)",
			"(˶º⤙º˶)",
			"૮₍｡´ᴖ ˔ ᴖ`｡₎ა",
			"(•̀ᴗ•́)و ̑̑",
			"(─‿‿─)",
		],
	},
} satisfies Meta<typeof GridLoader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Rectangular: Story = {
	args: { rows: 4, columns: 2 },
};
