import type { Meta, StoryObj } from "@storybook/react-vite";
import { ColorTokensPage, FoundationsPage, TypographyPage } from "./ThemePage";

const meta = {
	title: "Theme",
	parameters: {
		layout: "fullscreen",
		controls: { disable: true },
	},
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Colors: Story = {
	render: () => <ColorTokensPage />,
};

export const Typography: Story = {
	render: () => <TypographyPage />,
};

export const Foundations: Story = {
	render: () => <FoundationsPage />,
};
