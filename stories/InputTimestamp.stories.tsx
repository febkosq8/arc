import type { Meta, StoryObj } from "@storybook/react-vite";
import { InputTimestamp } from "../components";

const sampleTimestamp = Date.now();

const meta = {
	title: "Components/InputTimestamp",
	component: InputTimestamp,
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component: "A read-only text input that formats a timestamp with absolute and relative date tokens.",
			},
		},
	},
	argTypes: {
		value: {
			control: "date",
			description: "A date, timestamp, or ISO date string to format.",
			table: {
				type: { summary: "unknown" },
				defaultValue: { summary: "undefined" },
			},
		},
		format: {
			control: "text",
			description: "Output template. `$ISO$` and `$RELATIVE$` are replaced with formatted values.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: '"$ISO$ ($RELATIVE$)"' },
			},
		},
	},
	args: {
		value: undefined,
		format: "$ISO$ ($RELATIVE$)",
	},
} satisfies Meta<typeof InputTimestamp>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		value: sampleTimestamp,
	},
};

export const Empty: Story = {};

export const AbsoluteTimeOnly: Story = {
	args: {
		value: sampleTimestamp,
		format: "$ISO$",
	},
};
