import type { Meta, StoryObj } from "@storybook/react-vite";
import { useEffect, useState } from "react";
import { MultiDropdown } from "../components";
import type { DropdownItem } from "../components";

const items: DropdownItem[] = [
	{ key: "apple", text: "Apple" },
	{ key: "banana", text: "Banana" },
	{ key: "cherry", text: "Cherry" },
	{ key: "durian", text: "Durian (unavailable)", disabled: true },
];

const meta = {
	title: "Components/MultiDropdown",
	component: MultiDropdown,
	tags: ["autodocs"],
	parameters: { layout: "centered" },
	argTypes: {
		items: { control: "object", table: { type: { summary: "DropdownItem[]" } } },
		value: { control: "object", table: { type: { summary: "string[]" } } },
		placeholder: {
			control: "text",
			table: { type: { summary: "string" }, defaultValue: { summary: "Select options" } },
		},
		disabled: { control: "boolean", table: { type: { summary: "boolean" } } },
		preventEmpty: {
			control: "boolean",
			description: "Keeps at least one item selected.",
			table: { type: { summary: "boolean" }, defaultValue: { summary: "false" } },
		},
		className: { control: "text", table: { type: { summary: "string" } } },
		onChange: { control: false, table: { disable: true } },
	},
	args: {
		items,
		value: ["apple", "cherry"],
		placeholder: "Select options",
		disabled: false,
		preventEmpty: false,
		className: "w-80",
	},
} satisfies Meta<typeof MultiDropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: (args) => {
		const [value, setValue] = useState(args.value);
		useEffect(() => setValue(args.value), [args.value]);

		return (
			<div className="flex flex-col items-center gap-3">
				<MultiDropdown
					{...args}
					value={value}
					onChange={(selected) => setValue(selected.map((item) => String(item.key)))}
				/>
				<p className="text-sm text-muted-foreground">Current value: {value.join(", ") || "(none)"}</p>
			</div>
		);
	},
};
