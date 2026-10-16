import type { Meta, StoryObj } from "@storybook/react-vite";
import { TextArea } from "../components";

const meta = {
	title: "Components/TextArea",
	component: TextArea,
	tags: ["autodocs"],
	args: {
		placeholder: "Write a message...",
	},
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithValue: Story = {
	args: {
		value: "This is an example message.",
	},
};
