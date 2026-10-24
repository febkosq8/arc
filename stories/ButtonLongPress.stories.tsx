import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { LongPressButton } from "../components";

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
	},
} satisfies Meta;

export default meta;

type Story = StoryObj<{
	children: string;
	longPressMsDuration: number;
	preventClick: boolean;
	variant: (typeof variants)[number];
	size: (typeof sizes)[number];
	feedbackVariant: (typeof feedbackVariants)[number];
	feedbackContent?: string;
}>;

export const Default: Story = {
	render: ({ children, longPressMsDuration, preventClick, variant, size, feedbackVariant, feedbackContent }) => {
		const [message, setMessage] = useState("Press and hold for 2500ms");

		return (
			<div className="flex flex-col items-start gap-3">
				<LongPressButton
					longPressMsDuration={longPressMsDuration}
					preventClick={preventClick}
					variant={variant}
					size={size}
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
		size: {
			control: "select",
			options: sizes,
			description: "Button size, including icon-only sizes.",
			table: { defaultValue: { summary: "md" } },
		},
		feedbackVariant: {
			control: "select",
			options: feedbackVariants,
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
		size: "md",
		feedbackVariant: "primary",
		feedbackContent: "Keep holding",
	},
};

export const Variants: Story = {
	render: (args) => (
		<div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
			{variants.map((variant) => (
				<LongPressButton
					key={variant}
					variant={variant}
					size={args.size}
					longPressMsDuration={args.longPressMsDuration}
					preventClick={args.preventClick}
					feedbackVariant={args.feedbackVariant}
					feedbackContent={args.feedbackContent}
				>
					{variant}
				</LongPressButton>
			))}
		</div>
	),
	args: {
		children: "Press and hold",
		longPressMsDuration: 1500,
		preventClick: true,
		variant: "primary",
		size: "md",
		feedbackVariant: "warning",
		feedbackContent: "Keep holding",
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
						<LongPressButton
							variant={args.variant}
							size={size}
							longPressMsDuration={args.longPressMsDuration}
							preventClick={args.preventClick}
							feedbackVariant={args.feedbackVariant}
							feedbackContent={args.feedbackContent}
							aria-label={isIconSize ? size : undefined}
							title={size}
						>
							{isIconSize ? <FiArrowRight aria-hidden="true" className="size-4" /> : size}
						</LongPressButton>
						<span className="text-xs text-muted-foreground">{size}</span>
					</div>
				);
			})}
		</div>
	),
	args: {
		children: "Press and hold",
		longPressMsDuration: 1500,
		preventClick: true,
		variant: "primary",
		size: "md",
		feedbackVariant: "warning",
		feedbackContent: "Keep holding",
	},
	parameters: { controls: { exclude: ["size"] } },
};

export const FeedbackVariants: Story = {
	render: (args) => (
		<div className="flex flex-wrap items-center gap-4">
			{feedbackVariants.map((feedbackVariant) => (
				<div key={feedbackVariant} className="flex flex-col items-center gap-2">
					<LongPressButton
						variant={args.variant}
						size={args.size}
						longPressMsDuration={args.longPressMsDuration}
						preventClick={args.preventClick}
						feedbackVariant={feedbackVariant}
						feedbackContent={feedbackVariant}
					>
						Press and hold
					</LongPressButton>
					<span className="text-xs text-muted-foreground">{feedbackVariant}</span>
				</div>
			))}
			<p className="w-full text-center text-sm text-muted-foreground">Press and hold to preview each feedback ring.</p>
		</div>
	),
	args: {
		children: "Press and hold",
		longPressMsDuration: 1500,
		preventClick: true,
		variant: "secondary",
		size: "md",
		feedbackVariant: "warning",
		feedbackContent: "Keep holding",
	},
	parameters: { controls: { exclude: ["feedbackVariant"] } },
};
