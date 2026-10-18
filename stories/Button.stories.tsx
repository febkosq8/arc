import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../components";
import { FiArrowRight } from "react-icons/fi";

const meta = {
	title: "Components/Button",
	component: Button,
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component:
					"Buttons communicate actions and support semantic color variants, responsive sizes, and icon-only layouts. Touch devices enforce minimum target sizes without overriding larger caller-defined dimensions.\n\nAny additional props that are not used by the Button API are forwarded to the underlying button element.",
			},
		},
	},
	argTypes: {
		children: {
			control: "text",
			description: "Content displayed inside the button",
			table: {
				type: {
					summary: "ReactNode",
				},
			},
		},
		variant: {
			control: "select",
			description: "Visual style of the button.",
			table: {
				defaultValue: {
					summary: "primary",
				},
			},
			options: [
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
			],
		},
		size: {
			control: "select",
			description: "Button dimensions. Use an icon size for icon-only buttons.",
			table: {
				defaultValue: {
					summary: "md",
				},
			},
			options: ["xs", "sm", "md", "lg", "xl", "icon-xs", "icon-sm", "icon-md", "icon-lg", "icon-xl"],
		},
	},
	args: {
		children: "Button Text",
		variant: "primary",
		size: "md",
	},
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the Controls panel to change the label, variant, and size.",
			},
		},
	},
};

export const Variants: Story = {
	render: (args) => {
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

		return (
			<div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
				{variants.map((variant) => (
					<div key={variant} className="flex flex-col items-center gap-2">
						<Button {...args} variant={variant}>
							{variant}
						</Button>
						<span className="text-xs text-muted-foreground">{variant}</span>
					</div>
				))}
			</div>
		);
	},
	args: {
		...meta.args,
		size: "md",
	},
	parameters: {
		docs: {
			description: {
				story: "A comparison of every semantic Button variant.",
			},
		},
	},
};

export const IconOnly: Story = {
	render: (args) => (
		<Button {...args} aria-label="Continue" title="Continue">
			<FiArrowRight aria-hidden="true" className="h-4 w-4" />
		</Button>
	),
	parameters: {
		controls: {
			exclude: ["children"],
		},
		docs: {
			description: {
				story: "Use IconOnly for actions represented by an icon without visible text.",
			},
		},
	},
	argTypes: {
		size: {
			control: "select",
			description: "Icon button dimensions.",
			options: ["icon-xs", "icon-sm", "icon-md", "icon-lg", "icon-xl"],
		},
	},
	args: {
		children: undefined,
		size: "icon-md",
	},
};
