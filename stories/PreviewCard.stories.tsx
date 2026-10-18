import type { Meta, StoryObj } from "@storybook/react-vite";
import { useEffect, useState } from "react";
import { Button, PreviewCard } from "../components";

const meta = {
	title: "Components/PreviewCard",
	component: PreviewCard,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component: "A card that appears next to a trigger on hover or click to show extra details.",
			},
		},
	},
	argTypes: {
		trigger: {
			control: "inline-radio",
			description: "Interaction that opens the card.",
			options: ["hover", "click"],
			table: { type: { summary: '"hover" | "click"' }, defaultValue: { summary: "hover" } },
		},
		side: {
			control: "inline-radio",
			description: "Side of the trigger the card appears on.",
			options: ["top", "bottom", "left", "right"],
			table: { type: { summary: '"top" | "bottom" | "left" | "right"' }, defaultValue: { summary: "bottom" } },
		},
		align: {
			control: "inline-radio",
			description: "Alignment of the card along the chosen side.",
			options: ["start", "center", "end"],
			table: { type: { summary: '"start" | "center" | "end"' }, defaultValue: { summary: "center" } },
		},
		cardContent: {
			control: "text",
			description: "Content shown inside the card.",
			table: { type: { summary: "ReactNode" } },
		},
		children: {
			control: "text",
			description: "Trigger content that opens the card.",
			table: { type: { summary: "ReactNode" } },
		},
		open: {
			control: false,
			description: "Controls the open state when managing the popover externally.",
			table: { type: { summary: "boolean | undefined" }, defaultValue: { summary: "undefined" } },
		},
		onOpenChange: {
			control: false,
			description: "Called when a controlled popover requests an open-state change.",
			table: { type: { summary: "(open: boolean) => void" } },
		},
		triggerRender: { control: false, table: { disable: true } },
	},
	args: {
		trigger: "hover",
		side: "bottom",
		align: "center",
		cardContent: "Extra details shown in the card.",
		children: "Hover me",
		open: undefined,
		onOpenChange: undefined,
	},
} satisfies Meta<typeof PreviewCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: (args) => (
		<div className="p-16 text-foreground">
			<PreviewCard {...args} />
		</div>
	),
};

export const ClickTrigger: Story = {
	args: { trigger: "click", children: "Open card" },
	render: (args) => (
		<div className="p-16">
			<PreviewCard {...args} triggerRender={<Button variant="outline-primary" />} />
		</div>
	),
};

export const NearViewportEdge: Story = {
	args: {
		trigger: "click",
		children: "Edge trigger",
		cardContent: "The arrow stays aligned with the trigger when the card shifts to fit the viewport.",
	},
	render: (args) => (
		<div className="fixed top-1/2 left-2 -translate-y-1/2 text-foreground">
			<PreviewCard {...args} />
		</div>
	),
};
