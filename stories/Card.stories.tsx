import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card } from "../components";

type CardStoryArgs = React.ComponentProps<typeof Card> & {
	header: string;
	content: string;
	footer: string;
};

const meta = {
	title: "Components/Card",
	component: Card,
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component:
					"A bordered container with optional header, content and footer sections, plus configurable hover effects.",
			},
		},
	},
	argTypes: {
		header: {
			control: "text",
			description: "Text displayed in the card header.",
		},
		content: {
			control: "text",
			description: "Text displayed in the card content.",
		},
		footer: {
			control: "text",
			description: "Text displayed in the card footer.",
		},
		variant: {
			control: "select",
			description: "Card color and border treatment. Defaults to outline-secondary.",
			options: [
				"primary",
				"secondary",
				"destructive",
				"warning",
				"outline-primary",
				"outline-secondary",
				"outline-destructive",
				"outline-warning",
			],
			table: {
				type: {
					summary:
						'"primary" | "secondary" | "destructive" | "warning" | "outline-primary" | "outline-secondary" | "outline-destructive" | "outline-warning"',
				},
				defaultValue: {
					summary: "outline-secondary",
				},
			},
		},
		hoverable: {
			control: "boolean",
			description: "Enables the card hover effects.",
			table: {
				defaultValue: {
					summary: "true",
				},
			},
		},
		hoverLift: {
			control: "boolean",
			description: "Lifts the card on hover.",
			table: {
				defaultValue: {
					summary: "true",
				},
			},
		},
		hoverBorder: {
			control: "boolean",
			description: "Changes the card border color on hover.",
			table: {
				defaultValue: {
					summary: "true",
				},
			},
		},
		hoverGradient: {
			control: "boolean",
			description: "Shows a cursor-following gradient border on hover.",
			table: {
				defaultValue: {
					summary: "true",
				},
			},
		},
		postHeaderBorder: {
			control: "boolean",
			description: "Shows a border after the card header.",
			table: {
				defaultValue: {
					summary: "true",
				},
			},
		},
		preFooterBorder: {
			control: "boolean",
			description: "Shows a border before the card footer.",
			table: {
				defaultValue: {
					summary: "true",
				},
			},
		},
	},
	args: {
		header: "Account settings",
		content: "Update your profile and notification preferences.",
		footer: `Last updated ${new Date().toLocaleDateString()}`,
		variant: "outline-secondary",
		hoverable: true,
		hoverLift: true,
		hoverBorder: true,
		hoverGradient: true,
		postHeaderBorder: true,
		preFooterBorder: true,
	},
} satisfies Meta<CardStoryArgs>;

export default meta;
type Story = StoryObj<CardStoryArgs>;

export const Default: Story = {
	args: {
		variant: "outline-secondary",
	},

	render: ({ header, content, footer, ...args }) => (
		<Card {...args} className="max-w-md">
			<Card.Header>{header}</Card.Header>
			<Card.Content>{content}</Card.Content>
			<Card.Footer>{footer}</Card.Footer>
		</Card>
	),
};

export const Variants: Story = {
	render: (args) => (
		<div className="grid max-w-3xl gap-4 sm:grid-cols-2">
			{(
				[
					"primary",
					"outline-primary",
					"secondary",
					"outline-secondary",
					"destructive",
					"outline-destructive",
					"warning",
					"outline-warning",
				] as const
			).map((variant) => (
				<Card {...args} variant={variant} key={variant}>
					<Card.Header>{variant}</Card.Header>
					<Card.Content>Card content with the {variant} variant.</Card.Content>
					<Card.Footer>Variant example</Card.Footer>
				</Card>
			))}
		</div>
	),
	parameters: {
		controls: {
			exclude: ["variant"],
		},
	},
};
