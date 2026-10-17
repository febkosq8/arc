import type { Meta, StoryObj } from "@storybook/react-vite";
import { ErrorText } from "../components";

const meta = {
	title: "Components/ErrorText",
	component: ErrorText,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
		docs: { description: { component: "Inline validation text for showing one or more error messages." } },
	},
	argTypes: {
		data: {
			control: "object",
			description: "Message or list of messages. Lists are joined with commas.",
			table: { type: { summary: "string | string[] | null" } },
		},
	},
	args: { data: "This field is required" },
} satisfies Meta<typeof ErrorText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const MultipleMessages: Story = {
	args: { data: ["Too short", "Must contain a number"] },
};
