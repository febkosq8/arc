import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "../components";

const meta = {
	title: "Components/Input",
	component: Input,
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: { component: "A text input that can also render as a textarea, with default and ghost styles." },
		},
	},
	argTypes: {
		autoComplete: {
			control: false,
			table: { disable: true },
		},
		disabled: {
			control: "boolean",
			description: "Disables the field and blocks interaction.",
			table: {
				type: { summary: "boolean" },
				defaultValue: {
					summary: "false",
				},
			},
		},
		variant: {
			control: "select",
			description: "Visual style: default has a border, ghost is borderless.",
			options: ["default", "ghost"],
			table: {
				defaultValue: {
					summary: "default",
				},
			},
		},
		as: {
			control: "select",
			description: "Element to render: a single-line input or a multi-line textarea.",
			options: ["input", "textarea"],
			table: { type: { summary: '"input" | "textarea"' } },
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
