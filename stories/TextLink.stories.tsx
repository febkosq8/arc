import type { Meta, StoryObj } from "@storybook/react-vite";
import { TextLink } from "../components";

const meta = {
	title: "Components/TextLink",
	component: TextLink,
	tags: ["autodocs"],
	parameters: { layout: "centered" },
	argTypes: {
		href: { control: "text", table: { type: { summary: "string" } } },
		text: { control: "text", table: { type: { summary: "string" } } },
		target: {
			control: "inline-radio",
			options: ["_blank", "_self", "_parent", "_top"],
			table: { type: { summary: "string" }, defaultValue: { summary: "_blank" } },
		},
		className: { control: "text", table: { type: { summary: "string" } } },
	},
	args: { href: "https://github.com/febkosq8", text: "febkosq8 on GitHub", target: "_blank", className: "" },
} satisfies Meta<typeof TextLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
