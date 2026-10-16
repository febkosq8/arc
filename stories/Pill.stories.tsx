import type { Meta, StoryObj } from "@storybook/react-vite";
import { Pill } from "../components";

const meta = {
	title: "Components/Pill",
	component: Pill,
	tags: ["autodocs"],
	args: {
		children: "Pill",
	},
} satisfies Meta<typeof Pill>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Active: Story = {
	args: {
		active: true,
	},
};
