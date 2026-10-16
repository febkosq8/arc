import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Button, DoubleClickButton, LongPressButton } from "../components";

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
	button1Variant: ButtonGroupVariant;
	button2Content: string;
	button2Variant: ButtonGroupVariant;
	button3Content: string;
	button3Variant: ButtonGroupVariant;
	selectedVariant: ButtonGroupVariant;
}>;

type ButtonName = "Previous" | "Current" | "Next";
type ButtonGroupVariant =
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
			variant: ButtonGroupVariant;
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
					selectedVariant={selectedVariant}
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
			table: {
				defaultValue: {
					summary: "horizontal",
				},
			},
		},
		selectedVariant: {
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
			description: "Variant applied to the selected button.",
			table: {
				defaultValue: {
					summary: "none",
				},
			},
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
			description: "Variant used by the first button.",
		},
		button2Content: {
			control: "text",
			description: "Content displayed by the second button.",
		},
		button2Variant: {
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
			description: "Variant used by the second button.",
		},
		button3Content: {
			control: "text",
			description: "Content displayed by the third button.",
		},
		button3Variant: {
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
			description: "Variant used by the third button.",
		},
	},
	args: {
		orientation: "horizontal",
		selected: "Current",
		button1Content: "Previous",
		button1Variant: "secondary",
		button2Content: "Current",
		button2Variant: "secondary",
		button3Content: "Next",
		button3Variant: "secondary",
		selectedVariant: "primary",
	},
};

type InteractionStory = StoryObj<{
	orientation: "horizontal" | "vertical";
	interactionDuration: number;
	doubleClickButtonVariant: ButtonGroupVariant;
	doubleClickButtonFeedbackVariant: FeedbackVariant;
	normalButtonVariant: ButtonGroupVariant;
	longPressButtonVariant: ButtonGroupVariant;
	longPressButtonFeedbackVariant: FeedbackVariant;
	selectedVariant: ButtonGroupVariant;
}>;

type FeedbackVariant = "primary" | "secondary" | "destructive" | "warning";

export const WithInteractionButtons: InteractionStory = {
	render: ({
		orientation,
		interactionDuration,
		doubleClickButtonVariant,
		doubleClickButtonFeedbackVariant,
		normalButtonVariant,
		longPressButtonVariant,
		longPressButtonFeedbackVariant,
		selectedVariant,
	}) => {
		const [selected, setSelected] = useState<
			"double-click" | "normal" | "long-press"
		>("normal");

		return (
			<div className="flex flex-col items-start gap-3">
				<Button.Group
					orientation={orientation}
					selectedVariant={selectedVariant}
					aria-label="Button interactions"
				>
					<DoubleClickButton
						doubleClickTimeout={interactionDuration}
						variant={doubleClickButtonVariant}
						feedbackVariant={doubleClickButtonFeedbackVariant}
						aria-pressed={selected === "double-click"}
						onDoubleClick={() => setSelected("double-click")}
					>
						Double-click
					</DoubleClickButton>
					<Button
						variant={normalButtonVariant}
						aria-pressed={selected === "normal"}
						onClick={() => setSelected("normal")}
					>
						Normal button
					</Button>
					<LongPressButton
						longPressDuration={interactionDuration}
						variant={longPressButtonVariant}
						feedbackVariant={longPressButtonFeedbackVariant}
						aria-pressed={selected === "long-press"}
						onLongPress={() => setSelected("long-press")}
					>
						Long press
					</LongPressButton>
				</Button.Group>
				<span className="text-sm text-muted-foreground">
					Selected:{" "}
					{selected === "double-click"
						? "Double-click"
						: selected === "normal"
							? "Normal button"
							: "Long press"}
				</span>
			</div>
		);
	},
	argTypes: {
		orientation: {
			control: "select",
			options: ["horizontal", "vertical"],
			description: "Direction in which the interaction buttons are arranged.",
			table: {
				defaultValue: {
					summary: "horizontal",
				},
			},
			interactionDuration: {
				control: { type: "number", min: 0, step: 100 },
				description:
					"Shared time limit used by the double-click and long-press buttons, in milliseconds.",
				table: {
					defaultValue: {
						summary: "2500",
					},
				},
			},
		},
		doubleClickButtonVariant: {
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
			description: "Variant used by the double-click button.",
		},
		doubleClickButtonFeedbackVariant: {
			control: "select",
			options: ["primary", "secondary", "destructive", "warning"],
			description: "Feedback indicator variant used by the double-click button.",
			table: {
				defaultValue: {
					summary: "warning",
				},
			},
		},
		normalButtonVariant: {
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
			description: "Base variant used by the normal button.",
		},
		longPressButtonVariant: {
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
			description: "Variant used by the long-press button.",
		},
		longPressButtonFeedbackVariant: {
			control: "select",
			options: ["primary", "secondary", "destructive", "warning"],
			description: "Feedback indicator variant used by the long-press button.",
			table: {
				defaultValue: {
					summary: "warning",
				},
			},
		},
		selectedVariant: {
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
			description: "Variant applied to the selected interaction button.",
			table: {
				defaultValue: {
					summary: "primary",
				},
			},
		},
	},
	args: {
		orientation: "horizontal",
		interactionDuration: 2500,
		doubleClickButtonVariant: "secondary",
		doubleClickButtonFeedbackVariant: "destructive",
		normalButtonVariant: "secondary",
		longPressButtonVariant: "secondary",
		longPressButtonFeedbackVariant: "destructive",
		selectedVariant: "destructive",
	},
};
