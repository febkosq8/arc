import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../components";

const meta = {
	title: "Components/ButtonGroup",
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component: "A group of related buttons presented as a single control.",
			},
		},
	},
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<Button.Group>
			<Button>Previous</Button>
			<Button variant="secondary">Current</Button>
			<Button>Next</Button>
		</Button.Group>
	),
};
