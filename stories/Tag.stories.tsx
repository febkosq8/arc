import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tag } from "../components";

const meta = {
	title: "Components/Tag",
	component: Tag,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
		docs: {
			description: { component: "A label for marking status or category, with semantic color variants and sizes." },
		},
	},
	argTypes: {
		variant: {
			control: "select",
			description: "Color treatment for the tag.",
			options: ["primary", "secondary", "success", "warning", "destructive", "outline"],
			table: { defaultValue: { summary: "primary" } },
		},
		size: {
			control: "select",
			description: "Tag dimensions and text size.",
			options: ["xs", "sm", "md", "lg", "xl", "2xl", "3xl"],
			table: { defaultValue: { summary: "xs" } },
		},
		children: { control: "text", description: "Tag label.", table: { type: { summary: "ReactNode" } } },
	},
	args: { variant: "primary", size: "xs", children: "Beta" },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
	render: (args) => (
		<div className="flex flex-wrap items-center gap-2">
			<Tag {...args} variant="primary">Primary</Tag>
			<Tag {...args} variant="secondary">Secondary</Tag>
			<Tag {...args} variant="success">Success</Tag>
			<Tag {...args} variant="warning">Warning</Tag>
			<Tag {...args} variant="destructive">Destructive</Tag>
			<Tag {...args} variant="outline">Outline</Tag>
		</div>
	),
	args: { size: "md" },
};

export const Sizes: Story = {
	render: (args) => (
		<div className="flex flex-wrap items-center gap-3">
			{(["xs", "sm", "md", "lg", "xl", "2xl", "3xl"] as const).map((size) => (
				<div key={size} className="flex flex-col items-center gap-2">
					<Tag {...args} size={size}>
						{args.children}
					</Tag>
					<span className="text-xs text-muted-foreground">{size}</span>
				</div>
			))}
		</div>
	),
	args: { variant: "primary" },
};
