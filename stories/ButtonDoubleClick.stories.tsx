import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { DoubleClickButton } from "../components";

const meta = {
	title: "Components/ButtonDoubleClick",
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component: "A button that performs its action after a double-click.",
			},
		},
	},
	argTypes: {
		autoComplete: { control: false, table: { disable: true } },
	},
} satisfies Meta;

export default meta;

type Story = StoryObj<{
	children: string;
	doubleClickMsDuration: number;
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
	render: ({ children, doubleClickMsDuration, variant, feedbackVariant, feedbackContent }) => {
		const [message, setMessage] = useState("Waiting for a double-click");

		return (
			<div className="flex flex-col items-start gap-3">
				<DoubleClickButton
					doubleClickMsDuration={doubleClickMsDuration}
					variant={variant}
					feedbackVariant={feedbackVariant}
					feedbackContent={feedbackContent}
					onDoubleClick={() => setMessage("Double-click action fired")}
				>
					{children}
				</DoubleClickButton>
				<span className="text-sm text-muted-foreground">{message}</span>
			</div>
		);
	},
	argTypes: {
		children: { control: "text", description: "Button label." },
		doubleClickMsDuration: {
			control: { type: "number", min: 0, step: 100 },
			description: "Maximum time allowed between the first and second click, in milliseconds.",
			table: {
				type: {
					summary:
						'"primary" | "secondary" | "destructive" | "ghost" | "warning" | "outline-primary" | "outline-secondary" | "outline-destructive" | "outline-ghost" | "outline-warning"',
				},
				defaultValue: {
					summary: "2000",
				},
			},
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
			description: "Base variant used before the double-click feedback is active.",
			table: {
				type: { summary: '"primary" | "secondary" | "destructive" | "warning"' },
				defaultValue: {
					summary: "primary",
				},
			},
		},
		feedbackVariant: {
			control: "select",
			options: ["primary", "secondary", "destructive", "warning"],
			description: "Variant used while the double-click feedback is active.",
			table: {
				defaultValue: {
					summary: "warning",
				},
			},
		},
		feedbackContent: {
			control: "text",
			description:
				"Optional content or callback returning content shown while waiting for the second click. Callback receives the button state, remaining time, and configured props.",
		},
	},
	args: {
		children: "Double-click me",
		doubleClickMsDuration: 2000,
		variant: "secondary",
		feedbackVariant: "primary",
		feedbackContent: "Click again",
	},
};
