import type { Meta, StoryObj } from "@storybook/react-vite";
import { Divider } from "../components";

const meta = {
	title: "Components/Divider",
	component: Divider,
	tags: ["autodocs"],
	argTypes: {
		className: { control: "text", table: { type: { summary: "string" } } },
	},
	args: { className: "" },
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: (args) => (
		<div className="flex w-full max-w-md flex-col gap-3 text-foreground">
			<p>Above</p>
			<Divider {...args} />
			<p>Below</p>
		</div>
	),
};
