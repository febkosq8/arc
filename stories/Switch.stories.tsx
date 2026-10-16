import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Switch } from "../components";

const meta = {
	title: "Components/Switch",
	component: Switch,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
	},
	argTypes: {
		variant: {
			control: "select",
			options: ["primary", "danger", "success"],
		},
	},
	args: {
		variant: "primary",
	},
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: (args) => {
		const [checked, setChecked] = useState(false);
		return <Switch {...args} checked={checked} onChange={setChecked} />;
	},
};

export const Checked: Story = {
	args: {
		checked: true,
		variant: "success",
	},
};

export const Disabled: Story = {
	args: {
		disabled: true,
		checked: true,
	},
};
