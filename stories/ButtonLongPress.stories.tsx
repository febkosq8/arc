import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { LongPressButton } from "../components";

const meta = {
	title: "Components/ButtonLongPress",
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component: "A button that performs its action after being pressed and held.",
			},
		},
	},
	argTypes: {
		autoComplete: { control: false, table: { disable: true } },
		className: { control: false, table: { disable: true } },
	},
} satisfies Meta;

export default meta;

type Story = StoryObj<{
	children: string;
	longPressMsDuration: number;
	preventClick: boolean;
	variant:
		| "primary"
		| "secondary"
		| "destructive"
		| "ghost"
		| "warning"
		| "outline-primary"
		| "outline-secondary"
		| "outline-destructive"
		| "outline-ghost"
		| "outline-warning";
	feedbackVariant: "primary" | "secondary" | "destructive" | "warning";
	feedbackContent?: string;
}>;

export const Default: Story = {
	render: ({ children, longPressMsDuration, preventClick, variant, feedbackVariant, feedbackContent }) => {
		const [message, setMessage] = useState("Press and hold for 2500ms");

		return (
			<div className="flex flex-col items-start gap-3">
				<LongPressButton
					longPressMsDuration={longPressMsDuration}
					preventClick={preventClick}
					variant={variant}
					feedbackVariant={feedbackVariant}
					feedbackContent={feedbackContent}
					onLongPress={() => setMessage("Long-press action fired")}
				>
					{children}
				</LongPressButton>
				<span className="text-sm text-muted-foreground">{message.replace("2500", String(longPressMsDuration))}</span>
			</div>
		);
	},
	argTypes: {
		children: { control: "text", description: "Button label." },
		longPressMsDuration: {
			control: { type: "number", min: 0, step: 50 },
			description: "How long the button must be held, in milliseconds.",
			table: { defaultValue: { summary: "2500" } },
		},
		preventClick: {
			control: "boolean",
			description: "Prevent the regular click after a long press.",
			table: { defaultValue: { summary: "true" } },
		},
		variant: {
			control: "select",
			options: [
				"primary",
				"secondary",
				"destructive",
				"ghost",
				"warning",
				"outline-primary",
				"outline-secondary",
				"outline-destructive",
				"outline-ghost",
				"outline-warning",
			],
			description: "Base variant used before the long-press feedback is active.",
			table: {
				type: { summary: "ButtonVariant" },
				defaultValue: { summary: "primary" },
			},
		},
		feedbackVariant: {
			control: "select",
			options: ["primary", "secondary", "destructive", "warning"],
			description: "Variant used for the long-press feedback indicator.",
			table: {
				type: { summary: '"primary" | "secondary" | "destructive" | "warning"' },
				defaultValue: { summary: "warning" },
			},
		},
		feedbackContent: {
			control: "text",
			description: "Optional content shown while the button is being held.",
		},
	},
	args: {
		children: "Press and hold",
		longPressMsDuration: 2500,
		preventClick: true,
		variant: "secondary",
		feedbackVariant: "primary",
		feedbackContent: "Keep holding",
	},
};
