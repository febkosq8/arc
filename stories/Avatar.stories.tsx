import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar } from "../components";

const meta = {
	title: "Components/Avatar",
	component: Avatar,
	tags: ["autodocs"],
	parameters: { layout: "centered" },
	argTypes: {
		user: {
			control: "object",
			description: "User whose image or initials are shown. Falls back to initials when the image is missing or fails.",
			table: { type: { summary: "{ name?: string | null; image?: string | null }" } },
		},
		className: { control: "text", table: { type: { summary: "string" } } },
	},
	args: {
		user: { name: "Febin Kosq", image: "https://avatars.githubusercontent.com/u/1?v=4" },
		className: "",
	},
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Initials: Story = {
	args: { user: { name: "Febin Kosq", image: null } },
};

export const BrokenImage: Story = {
	args: { user: { name: "Broken Image", image: "https://invalid.example/missing.png" } },
};

export const Fallback: Story = {
	args: { user: null },
};
