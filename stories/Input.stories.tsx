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

export const Variants: Story = {
	render: (args) => (
		<div className="flex w-72 flex-col gap-4">
			{(["default", "ghost"] as const).map((variant) => (
				<label key={variant} className="flex flex-col gap-2 text-sm">
					<span className="text-muted-foreground">{variant}</span>
					<Input {...args} variant={variant} aria-label={`${variant} input`} />
				</label>
			))}
		</div>
	),
	parameters: {
		controls: {
			exclude: ["variant"],
		},
		docs: {
			description: {
				story: "A side-by-side comparison of every predefined Input variant.",
			},
		},
	},
};

export const Textarea: Story = {
	args: {
		as: "textarea",
		placeholder: "Write a message...",
		rows: 5,
	},
};
