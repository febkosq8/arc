import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { DoubleClickButton } from "../components";

const variants = [
	"primary",
	"secondary",
	"success",
	"destructive",
	"ghost",
	"warning",
	"outline-primary",
	"outline-secondary",
	"outline-success",
	"outline-destructive",
	"outline-ghost",
	"outline-warning",
] as const;
const sizes = ["xs", "sm", "md", "lg", "xl", "icon-xs", "icon-sm", "icon-md", "icon-lg", "icon-xl"] as const;
const feedbackVariants = ["primary", "secondary", "destructive", "warning"] as const;

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
	variant: (typeof variants)[number];
	size: (typeof sizes)[number];
	feedbackVariant: (typeof feedbackVariants)[number];
	feedbackContent?: string;
}>;

export const Default: Story = {
	render: ({ children, doubleClickMsDuration, variant, size, feedbackVariant, feedbackContent }) => {
		const [message, setMessage] = useState("Waiting for a double-click");

		return (
			<div className="flex flex-col items-start gap-3">
				<DoubleClickButton
					doubleClickMsDuration={doubleClickMsDuration}
					variant={variant}
					size={size}
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
			table: { type: { summary: "number" }, defaultValue: { summary: "2000" } },
		},
		variant: {
			control: "select",
			options: variants,
			description: "Base variant used before the double-click feedback is active.",
			table: {
				type: { summary: "ButtonVariant" },
				defaultValue: { summary: "primary" },
			},
		},
		size: {
			control: "select",
			options: sizes,
			description: "Button size, including icon-only sizes.",
			table: { defaultValue: { summary: "md" } },
		},
		feedbackVariant: {
			control: "select",
			options: feedbackVariants,
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
		size: "md",
		feedbackVariant: "primary",
		feedbackContent: "Click again",
	},
};

export const Variants: Story = {
	render: (args) => (
		<div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
			{variants.map((variant) => (
				<DoubleClickButton
					key={variant}
					variant={variant}
					size={args.size}
					doubleClickMsDuration={args.doubleClickMsDuration}
					feedbackVariant={args.feedbackVariant}
					feedbackContent={args.feedbackContent}
				>
					{variant}
				</DoubleClickButton>
			))}
		</div>
	),
	args: {
		children: "Double-click me",
		doubleClickMsDuration: 2000,
		variant: "primary",
		size: "md",
		feedbackVariant: "warning",
		feedbackContent: "Click again",
	},
	parameters: { controls: { exclude: ["variant"] } },
};

export const Sizes: Story = {
	render: (args) => (
		<div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
			{sizes.map((size) => {
				const isIconSize = size.startsWith("icon-");

				return (
					<div key={size} className="flex flex-col items-center gap-2">
						<DoubleClickButton
							variant={args.variant}
							size={size}
							doubleClickMsDuration={args.doubleClickMsDuration}
							feedbackVariant={args.feedbackVariant}
							feedbackContent={args.feedbackContent}
							aria-label={isIconSize ? size : undefined}
							title={size}
						>
							{isIconSize ? <FiArrowRight aria-hidden="true" className="size-4" /> : size}
						</DoubleClickButton>
						<span className="text-xs text-muted-foreground">{size}</span>
					</div>
				);
			})}
		</div>
	),
	args: {
		children: "Double-click me",
		doubleClickMsDuration: 2000,
		variant: "primary",
		size: "md",
		feedbackVariant: "warning",
		feedbackContent: "Click again",
	},
	parameters: { controls: { exclude: ["size"] } },
};

export const FeedbackVariants: Story = {
	render: (args) => (
		<div className="flex flex-wrap items-center gap-4">
			{feedbackVariants.map((feedbackVariant) => (
				<div key={feedbackVariant} className="flex flex-col items-center gap-2">
					<DoubleClickButton
						variant={args.variant}
						size={args.size}
						doubleClickMsDuration={args.doubleClickMsDuration}
						feedbackVariant={feedbackVariant}
						feedbackContent={feedbackVariant}
					>
						Double-click
					</DoubleClickButton>
					<span className="text-xs text-muted-foreground">{feedbackVariant}</span>
				</div>
			))}
			<p className="w-full text-center text-sm text-muted-foreground">Click once to preview each feedback ring.</p>
		</div>
	),
	args: {
		children: "Double-click me",
		doubleClickMsDuration: 3000,
		variant: "secondary",
		size: "md",
		feedbackVariant: "warning",
		feedbackContent: "Click again",
	},
	parameters: { controls: { exclude: ["feedbackVariant"] } },
};
