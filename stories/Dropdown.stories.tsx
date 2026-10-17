import type { Meta, StoryObj } from "@storybook/react-vite";
import { useEffect, useState } from "react";
import { Dropdown } from "../components";
import type { DropdownItem } from "../components";

const items: DropdownItem[] = [
	{ key: "apple", text: "Apple" },
	{ key: "banana", text: "Banana" },
	{ key: "cherry", text: "Cherry" },
	{ key: "durian", text: "Durian (unavailable)", disabled: true },
];

const meta = {
	title: "Components/Dropdown",
	component: Dropdown,
	tags: ["autodocs"],
	parameters: { layout: "centered" },
	argTypes: {
		items: { control: "object", table: { type: { summary: "DropdownItem[]" } } },
		value: { control: "text", table: { type: { summary: "string | number" } } },
		placeholder: {
			control: "text",
			table: { type: { summary: "string" }, defaultValue: { summary: "Select an option" } },
		},
		disabled: { control: "boolean", table: { type: { summary: "boolean" } } },
		preventEmpty: {
			control: "boolean",
			description: "Prevents clearing the selection.",
			table: { type: { summary: "boolean" }, defaultValue: { summary: "false" } },
		},
		className: { control: "text", table: { type: { summary: "string" } } },
		onChange: { control: false, table: { disable: true } },
	},
	args: {
		items,
		value: "banana",
		placeholder: "Select an option",
		disabled: false,
		preventEmpty: false,
		className: "w-64",
	},
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: (args) => {
		const [value, setValue] = useState(args.value);
		useEffect(() => setValue(args.value), [args.value]);

		return (
			<div className="flex flex-col items-center gap-3">
				<Dropdown {...args} value={value} onChange={(item) => setValue(item?.key ?? "")} />
				<p className="text-sm text-muted-foreground">Current value: {String(value) || "(none)"}</p>
			</div>
		);
	},
};
