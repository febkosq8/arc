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
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"A searchable single-select dropdown. Its input and open state can be controlled for async suggestions, and items can provide custom rendering.",
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
			control: "text",
			description: "Key of the currently selected option.",
			table: { type: { summary: "string | number" } },
		},
		placeholder: {
			control: "text",
			description: "Text shown when nothing is selected.",
			table: { type: { summary: "string" }, defaultValue: { summary: "Select an option" } },
		},
		disabled: {
			control: "boolean",
			description: "Disables the dropdown and blocks interaction.",
			table: { type: { summary: "boolean" } },
		},
		preventEmpty: {
			control: "boolean",
			description: "Prevents clearing the selection.",
			table: { type: { summary: "boolean" }, defaultValue: { summary: "false" } },
		},
		inputValue: {
			control: false,
			description: "Controlled text displayed in the input.",
			table: { type: { summary: "string" } },
		},
		onInputValueChange: { control: false, table: { disable: true } },
		onKeyDown: { control: false, table: { disable: true } },
		open: {
			control: false,
			description: "Controls whether the options popup is open.",
			table: { type: { summary: "boolean" } },
		},
		onOpenChange: { control: false, table: { disable: true } },
		renderItem: { control: false, table: { disable: true } },
		renderValue: { control: false, table: { disable: true } },
		selectedValueFillsSpace: {
			control: "boolean",
			description: "Lets a custom selected value use the space normally occupied by the input.",
			table: { type: { summary: "boolean" }, defaultValue: { summary: "false" } },
		},
		loading: {
			control: "boolean",
			description: "Shows a loading status in the open popup.",
			table: { type: { summary: "boolean" }, defaultValue: { summary: "false" } },
		},
		loadingLabel: {
			control: "text",
			description: "Text shown while options are loading.",
			table: { type: { summary: "string" }, defaultValue: { summary: "Loading options…" } },
		},
		id: { control: false, table: { disable: true } },
		"aria-label": { control: false, table: { disable: true } },
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
		inputValue: undefined,
		onKeyDown: undefined,
		open: undefined,
		renderValue: undefined,
		selectedValueFillsSpace: false,
		loading: false,
		loadingLabel: "Loading options…",
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

export const LongSelectedValue: Story = {
	args: {
		items: [
			{
				key: "long",
				label: "Dance Dance {HD} - Mithun Chakraborty - Mandakini - Smita Patil - Amrish Puri - Hindi Full Movie",
			},
		],
		value: "long",
		inputValue: "",
		renderValue: (item) => item.label,
		selectedValueFillsSpace: true,
	},
	render: (args) => (
		<div className="w-80">
			<Dropdown {...args} />
		</div>
	),
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
		const [value, setValue] = useState("featured");

		return (
			<div className="w-80">
				<Dropdown items={richItems} value={value} onChange={(item) => setValue(String(item?.key ?? ""))} />
			</div>
		);
	},
};
