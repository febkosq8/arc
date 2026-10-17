import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tag } from "../components";

const meta = {
	title: "Components/Tag",
	component: Tag,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
		docs: { description: { component: "A small label for marking status or category, such as Beta." } },
	},
	argTypes: {
		children: { control: "text", description: "Tag label.", table: { type: { summary: "ReactNode" } } },
	},
	args: { children: "Beta" },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
