import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
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

type Story = StoryObj<{
	orientation: "horizontal" | "vertical";
	selected: "Previous" | "Current" | "Next";
	button1Content: string;
	button1Variant: "primary" | "secondary" | "destructive" | "ghost" | "warning";
	button2Content: string;
	button2Variant: "primary" | "secondary" | "destructive" | "ghost" | "warning";
	button3Content: string;
	button3Variant: "primary" | "secondary" | "destructive" | "ghost" | "warning";
	selectedVariant: "primary" | "secondary" | "destructive" | "ghost" | "warning";
}>;

type ButtonName = "Previous" | "Current" | "Next";

export const Default: Story = {
	render: ({
		orientation,
		selected: initialSelected,
		button1Content,
		button1Variant,
		button2Content,
		button2Variant,
		button3Content,
		button3Variant,
		selectedVariant,
	}) => {
		const [selected, setSelected] = useState(initialSelected);
		const buttons: Array<{
			content: string;
			variant: "primary" | "secondary" | "destructive" | "ghost" | "warning";
			name: ButtonName;
		}> = [
			{ content: button1Content, variant: button1Variant, name: "Previous" },
			{ content: button2Content, variant: button2Variant, name: "Current" },
			{ content: button3Content, variant: button3Variant, name: "Next" },
		];

		return (
			<div className="flex flex-col items-start gap-3">
				<Button.Group
					orientation={orientation}
					onSelectedVariant={selectedVariant}
					aria-label="Navigation"
				>
					{buttons.map((label) => {
						const isSelected = selected === label.name;

						return (
							<Button
								key={label.name}
								variant={label.variant}
								aria-pressed={isSelected}
								onClick={() => setSelected(label.name)}
							>
								{label.content}
							</Button>
						);
					})}
				</Button.Group>
				<span className="text-sm text-muted-foreground">
					Selected: {selected}
				</span>
			</div>
		);
	},
	argTypes: {
		orientation: {
			control: "select",
			options: ["horizontal", "vertical"],
			description: "Direction in which the buttons are arranged.",
		},
		selected: {
			control: "select",
			options: ["Previous", "Current", "Next"],
			description: "Button selected when the story is first rendered.",
		},
		button1Content: {
			control: "text",
			description: "Content displayed by the first button.",
		},
		button1Variant: {
			control: "select",
			options: ["primary", "secondary", "destructive", "ghost", "warning"],
			description: "Variant used by the first button.",
		},
		button2Content: {
			control: "text",
			description: "Content displayed by the second button.",
		},
		button2Variant: {
			control: "select",
			options: ["primary", "secondary", "destructive", "ghost", "warning"],
			description: "Variant used by the second button.",
		},
		button3Content: {
			control: "text",
			description: "Content displayed by the third button.",
		},
		button3Variant: {
			control: "select",
			options: ["primary", "secondary", "destructive", "ghost", "warning"],
			description: "Variant used by the third button.",
		},
		selectedVariant: {
			control: "select",
			options: ["primary", "secondary", "destructive", "ghost", "warning"],
			description: "Variant applied to the selected button.",
		},
	},
	args: {
		orientation: "horizontal",
		selected: "Current",
		button1Content: "Previous",
		button1Variant: "secondary",
		button2Content: "Current",
		button2Variant: "primary",
		button3Content: "Next",
		button3Variant: "secondary",
		selectedVariant: "primary",
	},
};
