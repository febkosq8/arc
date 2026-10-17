import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "../components";

const meta = {
	title: "Components/Input",
	component: Input,
	tags: ["autodocs"],
	argTypes: {
		autoComplete: {
			control: "text",
			table: {
				defaultValue: {
					summary: "off",
				},
			},
		},
		disabled: {
			control: "boolean",
			table: {
				defaultValue: {
					summary: "false",
				},
			},
		},
		variant: {
			control: "select",
			options: ["default", "ghost"],
			table: {
				defaultValue: {
					summary: "default",
				},
			},
		},
	},
	args: {
		autoComplete: "off",
		disabled: false,
		placeholder: "Enter your email",
		type: "email",
		variant: "default",
	},
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};