import type { Meta, StoryObj } from "@storybook/react-vite";
import { useEffect, useState } from "react";
import { MultiDropdown } from "../components";
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
	title: "Components/DropdownMulti",
	component: MultiDropdown,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component: "A searchable multi-select dropdown that shows the selected options as removable chips.",
			},
		},
	},
	argTypes: {
		items: {
			control: "object",
			description:
				"Options may use a ReactNode label. Text is extracted from its children; optional labelTextValue overrides it when needed. String and number labels use their own text.",
			table: { type: { summary: "DropdownItem[]" } },
		},
		value: {
			control: "object",
			description: "Keys of the currently selected options.",
			table: { type: { summary: "string[]" } },
		},
		placeholder: {
			control: "text",
			description: "Text shown when nothing is selected.",
			table: { type: { summary: "string" }, defaultValue: { summary: "Select options" } },
		},
		disabled: {
			control: "boolean",
			description: "Disables the dropdown, including removing chips.",
			table: { type: { summary: "boolean" } },
		},
		preventEmpty: {
			control: "boolean",
			description: "Keeps at least one item selected.",
			table: { type: { summary: "boolean" }, defaultValue: { summary: "false" } },
		},
		"data-name": { control: false, table: { disable: true } },
		"data-required": { control: false, table: { disable: true } },
		onChange: { control: false, table: { disable: true } },
	},
	args: {
		items,
		value: ["apple", "cherry"],
		placeholder: "Select options",
		disabled: false,
		preventEmpty: false,
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

export const RichOptionLabel: Story = {
	render: () => {
		const richItems: DropdownItem[] = [
			{
				key: "featured",
				label: (
					<span className="inline-flex items-center gap-2">
						<span className="font-semibold text-primary">Featured:</span>
						Seasonal fruit
					</span>
				),
			},
			{ key: "plain", label: "Plain text option" },
		];
		const [value, setValue] = useState(["featured"]);

		return (
			<div className="w-80">
				<MultiDropdown
					items={richItems}
					value={value}
					onChange={(selected) => setValue(selected.map((item) => String(item.key)))}
				/>
			</div>
		);
	},
};
