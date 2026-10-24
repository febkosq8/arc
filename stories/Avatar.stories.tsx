import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar } from "../components";

const meta = {
	title: "Components/Avatar",
	component: Avatar,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"A circular user avatar that shows an image and falls back to initials when it is missing or fails to load.",
			},
		},
	},
	argTypes: {
		name: {
			control: "text",
			description: "Name used for the avatar initials and accessible labels.",
			table: { disable: false },
		},
		image: {
			control: "text",
			description: "Image URL. Falls back to initials when missing or when the image fails to load.",
		},
		size: {
			control: "select",
			description: "Avatar dimensions.",
			table: { defaultValue: { summary: "md" } },
			options: ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl", "7xl", "8xl"],
		},
		variant: {
			control: "select",
			description: "Use the default border or a colored ring.",
			table: { defaultValue: { summary: "default" } },
			options: ["default", "ring"],
		},
		ringColor: {
			control: "select",
			description: "Semantic color for the ring variant.",
			table: { defaultValue: { summary: "primary" } },
			options: ["primary", "secondary", "accent", "muted", "destructive", "success", "warning"],
		},
	},
	args: {
		name: "Jamie Rivera",
		image: "https://avatars.githubusercontent.com/u/1?v=4",
		size: "md",
		variant: "default",
		ringColor: "primary",
	},
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Initials: Story = {
	args: { name: "Jamie Rivera", image: null, size: "md" },
};

export const BrokenImage: Story = {
	args: { name: "Broken Image", image: "https://invalid.example/missing.png", size: "md" },
};

export const Fallback: Story = {
	args: { name: null, image: null, size: "md" },
};

export const Sizes: Story = {
	render: (args) => (
		<div className="flex flex-wrap items-end gap-6">
			{(["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl", "7xl", "8xl"] as const).map((size) => (
				<div key={size} className="flex flex-col items-center gap-2">
					<Avatar {...args} name="Jamie Rivera" image={null} size={size} />
					<span className="text-sm text-muted-foreground">{size}</span>
				</div>
			))}
		</div>
	),
};

export const Variants: Story = {
	render: (args) => (
		<div className="flex flex-wrap items-center gap-6">
			{(["default", "ring"] as const).map((variant) => (
				<div key={variant} className="flex flex-col items-center gap-2">
					<Avatar {...args} name="Jamie Rivera" image={null} variant={variant} />
					<span className="text-sm text-muted-foreground">{variant}</span>
				</div>
			))}
		</div>
	),
};

export const Rings: Story = {
	render: (args) => (
		<div className="flex flex-wrap items-center gap-6">
			{(["primary", "secondary", "accent", "muted", "destructive", "success", "warning"] as const).map(
				(ringColor) => (
					<div key={ringColor} className="flex flex-col items-center gap-2">
						<Avatar {...args} name="Jamie Rivera" image={null} variant="ring" ringColor={ringColor} />
						<span className="text-sm text-muted-foreground">{ringColor}</span>
					</div>
				),
			)}
		</div>
	),
};
