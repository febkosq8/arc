import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "../components";

const meta = {
	title: "Components/Input",
	component: Input,
	tags: ["autodocs"],
	args: {
		placeholder: "Enter your email",
		type: "email",
	},
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = {
	args: {
		disabled: true,
		value: "Unavailable",
	},
};
