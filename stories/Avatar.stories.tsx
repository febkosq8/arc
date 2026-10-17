import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar } from "../components";

const meta = {
	title: "Components/Avatar",
	component: Avatar,
	tags: ["autodocs"],
	parameters: { layout: "centered" },
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
			options: ["xs", "sm", "md", "lg", "xl"],
		},
	},
	args: {
		name: "Jamie Rivera",
		image: "https://avatars.githubusercontent.com/u/1?v=4",
		size: "md",
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
