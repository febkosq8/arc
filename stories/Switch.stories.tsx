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

export const Variants: Story = {
	render: (args) => {
		const [checkedByVariant, setCheckedByVariant] = useState({
			primary: args.checked ?? false,
			secondary: args.checked ?? false,
			danger: args.checked ?? false,
			success: args.checked ?? false,
		});

		return (
			<div className="flex flex-wrap items-center gap-6">
				{(["primary", "secondary", "danger", "success"] as const).map((variant) => (
					<label key={variant} className="flex items-center gap-2">
						<Switch
							{...args}
							checked={checkedByVariant[variant]}
							variant={variant}
							onChange={(checked) => setCheckedByVariant((current) => ({ ...current, [variant]: checked }))}
						/>
						<span className="text-sm text-foreground">{variant}</span>
					</label>
				))}
			</div>
		);
	},
	args: { checked: true, disabled: false, variant: "primary" },
	parameters: {
		controls: {
			exclude: ["variant"],
		},
		docs: {
			description: {
				story: "A comparison of every predefined Switch color variant in its checked state.",
			},
		},
	},
};
