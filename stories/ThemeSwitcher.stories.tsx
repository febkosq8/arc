import type { Meta, StoryObj } from "@storybook/react-vite";
import { ThemeSwitcher } from "../components";

const meta = {
	title: "Components/ThemeSwitcher",
	component: ThemeSwitcher,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
	},
} satisfies Meta<typeof ThemeSwitcher>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Toggle: Story = {
	args: {
		variant: "toggle",
	},
};
