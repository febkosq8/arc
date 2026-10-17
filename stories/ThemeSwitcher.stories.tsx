import type { Meta, StoryObj } from "@storybook/react-vite";
import { ThemeSwitcher } from "../components";

const meta = {
	title: "Components/ThemeSwitcher",
	component: ThemeSwitcher,
	tags: ["autodocs"],
	argTypes: {
		autoComplete: { control: false, table: { disable: true } },
		className: { control: false, table: { disable: true } },
	},
	parameters: {
		layout: "centered",
	},
} satisfies Meta<typeof ThemeSwitcher>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
