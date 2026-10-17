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
		variant: {
			control: "select",
			description: "Color treatment for the tag.",
			options: ["primary", "secondary", "success", "warning", "destructive", "outline"],
			table: { defaultValue: { summary: "primary" } },
		},
		children: { control: "text", description: "Tag label.", table: { type: { summary: "ReactNode" } } },
	},
	args: { variant: "primary", children: "Beta" },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
	render: () => (
		<div className="flex flex-wrap items-center gap-2">
			<Tag variant="primary">Primary</Tag>
			<Tag variant="secondary">Secondary</Tag>
			<Tag variant="success">Success</Tag>
			<Tag variant="warning">Warning</Tag>
			<Tag variant="destructive">Destructive</Tag>
			<Tag variant="outline">Outline</Tag>
		</div>
	),
};
