import type { Meta, StoryObj } from "@storybook/react-vite";
import { useEffect, useState } from "react";
import { Select } from "../components";
import type { SelectItem } from "../components";

const data: SelectItem[] = [
	{ key: "light", label: "Light" },
	{ key: "dark", label: "Dark" },
	{ key: "system", label: "System" },
	{ key: "legacy", label: "Legacy (unavailable)", disabled: true },
];

const meta = {
	title: "Components/Select",
	component: Select,
	tags: ["autodocs"],
	parameters: { layout: "centered" },
	argTypes: {
		data: { control: "object", table: { type: { summary: "SelectItem[]" } } },
		value: { control: "text", table: { type: { summary: "string" } } },
		placeholder: { control: "text", table: { type: { summary: "string" } } },
		disabled: { control: "boolean", table: { type: { summary: "boolean" } } },
		id: { control: false, table: { disable: true } },
		onChange: { control: false, table: { disable: true } },
	},
	args: {
		data,
		value: "dark",
		placeholder: "Select a theme",
		disabled: false,
		onChange: () => {},
	},
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: (args) => {
		const [value, setValue] = useState(args.value);
		useEffect(() => setValue(args.value), [args.value]);

		return (
			<div className="flex flex-col items-center gap-3">
				<Select {...args} value={value} onChange={setValue} />
				<p className="text-sm text-muted-foreground">Current value: {value}</p>
			</div>
		);
	},
};
