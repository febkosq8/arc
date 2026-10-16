import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card } from "../components";

const meta = {
	title: "Components/Card",
	component: Card,
	tags: ["autodocs"],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: (args) => (
		<Card {...args} className="max-w-md">
			<Card.Header>Account settings</Card.Header>
			<Card.Content>Update your profile and notification preferences.</Card.Content>
			<Card.Footer>Last updated today</Card.Footer>
		</Card>
	),
};
