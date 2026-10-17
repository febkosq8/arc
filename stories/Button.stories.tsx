import type { Meta, StoryObj } from "@storybook/react-vite";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "../components";

const meta = {
	title: "Components/Button",
	component: Button,
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component:
					"Buttons communicate actions and support semantic color variants, responsive sizes, and icon-only layouts.\n\nAny additional props that are not used by the Button API are forwarded to the underlying <button> element.",
			},
		},
	},
	argTypes: {
		autoComplete: { control: false, table: { disable: true } },
		className: { control: false, table: { disable: true } },
		children: {
			control: "text",
			description: "Text displayed inside the button",
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
				"destructive",
				"ghost",
				"warning",
				"outline-primary",
				"outline-secondary",
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

export const IconOnly: Story = {
	render: (args) => (
		<Button {...args} aria-label="Continue" title="Continue">
			<FontAwesomeIcon icon={faArrowRight} aria-hidden="true" className="h-4 w-4" />
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
