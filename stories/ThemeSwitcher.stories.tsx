import type { Meta, StoryObj } from "@storybook/react-vite";
import { ThemeSwitcher } from "../components";

const meta = {
	title: "Components/ThemeSwitcher",
	component: ThemeSwitcher,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
		docs: { description: { component: "Switches between light, dark and system themes via a dropdown or a toggle." } },
	},
	argTypes: {
		variant: {
			control: "select",
			description: "Choose between a theme dropdown or a one-click theme toggle.",
			options: ["dropdown", "toggle"],
			table: {
				type: {
					summary: '"dropdown" | "toggle"',
				},
				defaultValue: {
					summary: "dropdown",
				},
			},
		},
		showLabel: {
			control: "boolean",
			description: "Show the current theme name alongside the icon.",
			table: {
				defaultValue: {
					summary: "false",
				},
			},
		},
	},
	args: {
		variant: "dropdown",
		showLabel: false,
	},
} satisfies Meta<typeof ThemeSwitcher>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		variant: "dropdown",
		showLabel: false,
	},
};

export const WithLabel: Story = {
	args: {
		variant: "dropdown",
		showLabel: true,
	},
};

export const Variants: Story = {
	render: () => (
		<div className="flex flex-wrap items-center gap-6">
			{(["dropdown", "toggle"] as const).map((variant) => (
				<div key={variant} className="flex flex-col items-center gap-2">
					<ThemeSwitcher variant={variant} />
					<span className="text-sm text-muted-foreground">{variant}</span>
				</div>
			))}
		</div>
	),
	parameters: {
		controls: {
			exclude: ["variant"],
		},
		docs: {
			description: {
				story: "A side-by-side comparison of the dropdown and toggle theme switchers.",
			},
		},
	},
};
