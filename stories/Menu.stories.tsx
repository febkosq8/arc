import type { Meta, StoryObj } from "@storybook/react-vite";
import { Menu, Pill } from "../components";

const meta = {
	title: "Components/Menu",
	component: Menu,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
	},
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<Menu buttonText="Options">
			<Menu.Item asChild>
				<Pill className="rounded-none text-base">Edit profile</Pill>
			</Menu.Item>
			<Menu.Item asChild>
				<Pill className="rounded-none text-base">Sign out</Pill>
			</Menu.Item>
		</Menu>
	),
};
