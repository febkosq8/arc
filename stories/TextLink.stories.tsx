import type { Meta, StoryObj } from "@storybook/react-vite";
import { TextLink } from "../components";

const meta = {
	title: "Components/TextLink",
	component: TextLink,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
		docs: { description: { component: "An inline text link that opens in a new tab by default." } },
	},
	argTypes: {
		href: { control: "text", description: "Destination URL of the link.", table: { type: { summary: "string" } } },
		text: { control: "text", description: "Visible link text.", table: { type: { summary: "string" } } },
		target: {
			control: "inline-radio",
			description: "Where the link opens.",
			options: ["_blank", "_self", "_parent", "_top"],
			table: { type: { summary: "string" }, defaultValue: { summary: "_blank" } },
		},
	},
	args: { href: "https://github.com/febkosq8", text: "febkosq8 on GitHub", target: "_blank" },
} satisfies Meta<typeof TextLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
