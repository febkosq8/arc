import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Button, DoubleClickButton, LongPressButton } from "../components";

const meta = {
	title: "Components/Button interactions",
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component:
					"Specialized buttons for double-click actions, long-press actions, and grouped actions.",
			},
		},
	},
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const DoubleClick: StoryObj<{
	children: string;
	doubleClickTimeout: number;
	feedbackVariant: "primary" | "secondary" | "destructive" | "ghost" | "warning";
}> = {
	render: ({ children, doubleClickTimeout, feedbackVariant }) => {
		const [message, setMessage] = useState("Waiting for a double-click");
		return (
			<div className="flex flex-col items-start gap-3">
				<DoubleClickButton
					doubleClickTimeout={doubleClickTimeout}
					feedbackVariant={feedbackVariant}
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
		doubleClickTimeout: {
			control: { type: "number", min: 0, step: 100 },
			description: "Maximum time allowed between the first and second click, in milliseconds.",
		},
		feedbackVariant: {
			control: "select",
			options: ["primary", "secondary", "destructive", "ghost", "warning"],
			description: "Variant used while the double-click feedback is active.",
		},
	},
	args: {
		children: "Double-click me",
		doubleClickTimeout: 2000,
		feedbackVariant: "warning",
	},
};

export const LongPress: StoryObj<{
	children: string;
	longPressDuration: number;
	preventClick: boolean;
}> = {
	render: ({ children, longPressDuration, preventClick }) => {
		const [message, setMessage] = useState("Press and hold for 500ms");
		return (
			<div className="flex flex-col items-start gap-3">
				<LongPressButton
					longPressDuration={longPressDuration}
					preventClick={preventClick}
					onLongPress={() => setMessage("Long-press action fired")}
				>
					{children}
				</LongPressButton>
				<span className="text-sm text-muted-foreground">
					{message.replace("500", String(longPressDuration))}
				</span>
			</div>
		);
	},
	argTypes: {
		children: { control: "text", description: "Button label." },
		longPressDuration: {
			control: { type: "number", min: 0, step: 50 },
			description: "How long the button must be held, in milliseconds.",
		},
		preventClick: {
			control: "boolean",
			description: "Prevent the regular click after a long press.",
		},
	},
	args: {
		children: "Press and hold",
		longPressDuration: 500,
		preventClick: true,
	},
};

export const Group: Story = {
	render: () => (
		<Button.Group>
			<Button>Previous</Button>
			<Button variant="secondary">Current</Button>
			<Button>Next</Button>
		</Button.Group>
	),
};
