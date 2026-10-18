import type { Meta, StoryObj } from "@storybook/react-vite";
import { LabelField } from "../components";

const meta = {
	title: "Components/LabelField",
	component: LabelField,
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component:
					"A form label with optional help content and validation errors. The label's id associates it with its form control.",
			},
		},
	},
	argTypes: {
		id: { control: false, table: { disable: true } },
		label: { control: "text" },
		help: {
			control: false,
			description: "Optional content shown in a help popover.",
			table: { type: { summary: "ReactNode" } },
		},
		errors: {
			control: "object",
			description: "Validation error message(s), as a string or array.",
			table: { type: { summary: "string | unknown[] | null" }, defaultValue: { summary: "undefined" } },
		},
		className: { control: false, table: { disable: true } },
	},
	args: {
		id: "email",
		label: "Email address",
		help: undefined,
		errors: undefined,
		className: undefined,
	},
} satisfies Meta<typeof LabelField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithHelp: Story = {
	args: {
		help: "Used for account notifications and sign-in recovery.",
	},
};

export const WithErrors: Story = {
	args: {
		errors: ["Enter a valid email address."],
	},
};
