import type { Meta, StoryObj } from "@storybook/react-vite";
import { ThemeSwitcher } from "../components";

const meta = {
	title: "Components/ThemeSwitcher",
	component: ThemeSwitcher,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
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
	},
} satisfies Meta<typeof ThemeSwitcher>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		variant: "dropdown",
	},
};

export const Toggle: Story = {
	args: {
		variant: "toggle",
	},
};
