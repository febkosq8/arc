import type { Meta, StoryObj } from "@storybook/react-vite";
import { useEffect, useState } from "react";
import { Button, PreviewCard } from "../components";

const meta = {
	title: "Components/PreviewCard",
	component: PreviewCard,
	tags: ["autodocs"],
	parameters: { layout: "centered" },
	argTypes: {
		trigger: {
			control: "inline-radio",
			options: ["hover", "click"],
			table: { type: { summary: '"hover" | "click"' }, defaultValue: { summary: "hover" } },
		},
		side: {
			control: "inline-radio",
			options: ["top", "bottom", "left", "right"],
			table: { type: { summary: '"top" | "bottom" | "left" | "right"' }, defaultValue: { summary: "bottom" } },
		},
		align: {
			control: "inline-radio",
			options: ["start", "center", "end"],
			table: { type: { summary: '"start" | "center" | "end"' }, defaultValue: { summary: "center" } },
		},
		className: { control: "text", table: { type: { summary: "string" } } },
		cardContent: { control: "text", table: { type: { summary: "ReactNode" } } },
		children: { control: "text", table: { type: { summary: "ReactNode" } } },
		triggerRender: { control: false, table: { disable: true } },
	},
	args: {
		trigger: "hover",
		side: "bottom",
		align: "center",
		className: "",
		cardContent: "Extra details shown in the card.",
		children: "Hover me",
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
