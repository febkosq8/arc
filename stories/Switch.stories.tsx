import type { Meta, StoryObj } from "@storybook/react-vite";
import { useEffect, useState } from "react";
import { Switch } from "../components";

const meta = {
	title: "Components/Switch",
	component: Switch,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
		docs: { description: { component: "A toggle switch for turning a setting on or off, with color variants." } },
	},
	argTypes: {
		checked: { control: "boolean", description: "Whether the switch is on." },
		disabled: { control: "boolean", description: "Disables the switch and blocks interaction." },
		onChange: {
			control: false,
			table: { disable: true },
		},
		children: {
			control: false,
			table: { disable: true },
		},
		variant: {
			control: "select",
			options: ["primary", "secondary", "danger", "success"],
			description: "Switch color variant.",
			table: {
				type: { summary: '"primary" | "secondary" | "danger" | "success"' },
				defaultValue: { summary: "primary" },
			},
		},
	},
	args: {
		checked: false,
		disabled: false,
		variant: "primary",
	},
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: (args) => {
		const [checked, setChecked] = useState(args.checked ?? false);
		useEffect(() => setChecked(args.checked ?? false), [args.checked]);

		return (
			<div className="flex flex-col items-center gap-3">
				<Switch {...args} checked={checked} onChange={setChecked} />
				<p className="text-sm text-muted-foreground">Current state: {checked ? "enabled" : "disabled"}</p>
			</div>
		);
	},
};
