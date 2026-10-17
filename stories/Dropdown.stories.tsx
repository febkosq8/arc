import type { Meta, StoryObj } from "@storybook/react-vite";
import { useEffect, useState } from "react";
import { Dropdown } from "../components";
import type { DropdownItem } from "../components";

const items: DropdownItem[] = [
	{ key: "apple", label: "Apple" },
	{ key: "banana", label: "Banana" },
	{ key: "cherry", label: "Cherry" },
	{ key: "durian", label: "Durian (unavailable)", disabled: true },
	{ key: "elderberry", label: "Elderberry" },
	{ key: "fig", label: "Fig" },
	{ key: "grape", label: "Grape" },
	{ key: "honeydew", label: "Honeydew" },
	{ key: "kiwi", label: "Kiwi" },
	{ key: "lemon", label: "Lemon" },
	{ key: "mango", label: "Mango" },
	{ key: "nectarine", label: "Nectarine" },
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
		"data-name": { control: false, table: { disable: true } },
		"data-required": { control: false, table: { disable: true } },
		onChange: { control: false, table: { disable: true } },
	},
	args: {
		items,
		value: "banana",
		placeholder: "Select an option",
		disabled: false,
		preventEmpty: false,
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
