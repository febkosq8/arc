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
} satisfies Meta;

export default meta;

type Story = StoryObj<{
	children: string;
	longPressDuration: number;
	preventClick: boolean;
}>;

export const Default: Story = {
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
