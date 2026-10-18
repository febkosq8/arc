import type { Meta, StoryObj } from "@storybook/react-vite";
import { GridLoader, type GridLoaderShape } from "../components";

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
		shape: {
			control: "select",
			options: ["circle", "square", "diamond", "star", "heart", "hexagon", "random"],
			description: "Shape used for every dot, or a random shape per dot that changes with its pulse.",
			table: { defaultValue: { summary: "circle" } },
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
		shape: "circle",
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

export const Sizes: Story = {
	render: (args) => (
		<div className="flex flex-wrap items-end gap-8">
			{[
				{ label: "Small", size: 64 },
				{ label: "Medium", size: 96 },
				{ label: "Large", size: 144 },
			].map(({ label, size }) => (
				<div key={label} className="flex flex-col items-center gap-2">
					<GridLoader {...args} size={size} maxSize={Math.min(24, size / 3)} />
					<span className="text-sm text-muted-foreground">{label}</span>
				</div>
			))}
		</div>
	),
};

export const Shapes: Story = {
	render: (args) => {
		const shapes: GridLoaderShape[] = ["circle", "square", "diamond", "star", "heart", "hexagon", "random"];

		return (
			<div className="grid grid-cols-4 gap-6">
				{shapes.map((shape) => (
					<div key={shape} className="flex flex-col items-center gap-2">
						<GridLoader {...args} shape={shape} />
						<span className="text-sm text-muted-foreground capitalize">{shape}</span>
					</div>
				))}
			</div>
		);
	},
};
