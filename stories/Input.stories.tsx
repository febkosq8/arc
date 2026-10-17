import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "../components";

const meta = {
	title: "Components/Input",
	component: Input,
	tags: ["autodocs"],
	argTypes: {
		autoComplete: {
			control: false,
			table: { disable: true },
		},
		disabled: {
			control: "boolean",
			table: {
				type: { summary: '"default" | "ghost"' },
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
		as: {
			control: "select",
			options: ["input", "textarea"],
			table: { type: { summary: '"input" | "textarea"' } },
		},
		className: {
			control: false,
			table: { disable: true },
		},
	},
	args: {
		as: "input",
		disabled: false,
		placeholder: "Enter your email",
		type: "email",
		variant: "default",
	},
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Textarea: Story = {
	args: {
		as: "textarea",
		placeholder: "Write a message...",
		rows: 5,
	},
};
