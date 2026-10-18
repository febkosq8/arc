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
			options: ["circle", "square", "diamond", "star", "heart", "hexagon", "mixed"],
			description: "Shape used for every dot, or a changing mix of shapes.",
			table: { defaultValue: { summary: "circle" } },
		},
		shapes: {
			control: { type: "check" },
			options: ["circle", "square", "diamond", "star", "heart", "hexagon"],
			description: "Shapes available when shape is set to mixed.",
			table: { defaultValue: { summary: "all supported shapes" } },
		},
		colors: {
			control: "object",
			description:
				"Optional CSS color palette cycles left to right as cells pulse. An empty palette uses the theme color.",
			table: { defaultValue: { summary: "[]" } },
		},
		label: {
			control: "text",
			description: "Accessible loading status announced to assistive technology.",
			table: { defaultValue: { summary: "Loading" } },
		},
		symbols: {
			control: "object",
			description:
				"Monochrome text symbols displayed inside each cell; each cell changes symbol with its pulse. An empty array hides symbols.",
			table: { defaultValue: { summary: "33 monochrome symbols" } },
		},
	},
	args: {
		rows: 3,
		columns: 3,
		size: 120,
		maxSize: 24,
		shape: "circle",
		shapes: ["circle", "square", "diamond", "star", "heart", "hexagon"],
		colors: [],
		label: "Loading",
		symbols: [
			"*",
			"+",
			"×",
			"÷",
			"=",
			"~",
			"!",
			"?",
			"@",
			"#",
			"%",
			"&",
			"§",
			"¶",
			"※",
			"◇",
			"◆",
			"○",
			"●",
			"△",
			"▽",
			"□",
			"■",
			"♠",
			"♣",
			"♦",
			"♤",
			"♧",
			"♢",
			"♪",
			"♫",
			"∴",
			"∵",
		],
	},
} satisfies Meta<typeof GridLoader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutSymbols: Story = {
	args: {
		symbols: [],
	},
};

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

export const GridLayouts: Story = {
	render: (args) => {
		const layouts = [
			{ rows: 1, columns: 1 },
			{ rows: 1, columns: 5 },
			{ rows: 2, columns: 4 },
			{ rows: 3, columns: 3 },
			{ rows: 4, columns: 2 },
			{ rows: 5, columns: 1 },
		];

		return (
			<div className="grid grid-cols-3 gap-8">
				{layouts.map(({ rows, columns }) => (
					<div key={`${rows}x${columns}`} className="flex flex-col items-center gap-2">
						<GridLoader {...args} rows={rows} columns={columns} />
						<span className="text-sm text-muted-foreground">
							{rows} row{rows === 1 ? "" : "s"} × {columns} column{columns === 1 ? "" : "s"}
						</span>
					</div>
				))}
			</div>
		);
	},
};

export const Shapes: Story = {
	render: (args) => {
		const shapes: GridLoaderShape[] = ["circle", "square", "diamond", "star", "heart", "hexagon", "mixed"];

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

export const Colors: Story = {
	args: {
		shape: "mixed",
		colors: [
			"var(--color-primary)",
			"var(--color-success)",
			"var(--color-warning)",
			"var(--color-destructive)",
		],
	},
	render: (args) => {
		const examples = [
			{ label: "One line", rows: 1, columns: 5 },
			{ label: "Two lines", rows: 2, columns: 5 },
			{ label: "Original grid", rows: 3, columns: 3 },
		];

		return (
			<div className="flex flex-col gap-8">
				{examples.map(({ label, rows, columns }) => (
					<div key={label} className="flex flex-col items-center gap-2">
						<GridLoader {...args} rows={rows} columns={columns} />
						<span className="text-sm text-muted-foreground">{label}</span>
					</div>
				))}
			</div>
		);
	},
};
