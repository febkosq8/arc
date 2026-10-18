import type { Meta, StoryObj } from "@storybook/react-vite";
import { Table } from "../components";
import type { TableColumnDef } from "../components";

const data = [
	{ name: "Ada Lovelace", role: "Admin", team: "Platform" },
	{ name: "Grace Hopper", role: "Editor", team: "Infrastructure" },
	{ name: "Katherine Johnson", role: "Viewer", team: "Research" },
	{ name: "Margaret Hamilton", role: "Editor", team: "Platform" },
	{ name: "Dorothy Vaughan", role: "Viewer", team: "Research" },
	{ name: "Jean Bartik", role: "Admin", team: "Infrastructure" },
	{ name: "Annie Easley", role: "Viewer", team: "Platform" },
	{ name: "Frances Allen", role: "Editor", team: "Research" },
	{ name: "Mary Jackson", role: "Admin", team: "Infrastructure" },
	{ name: "Barbara Liskov", role: "Viewer", team: "Platform" },
	{ name: "Radia Perlman", role: "Editor", team: "Research" },
];

const columnDef: TableColumnDef[] = [
	{
		accessorKey: "name",
		header: "Name",
		enableColumnFilter: true,
		filterFn: "fuzzy",
	},
	{
		accessorKey: "role",
		header: "Role",
		enableColumnFilter: true,
		filterSelectOptions: [
			{ value: "Admin", label: "Admin" },
			{ value: "Editor", label: "Editor" },
			{ value: "Viewer", label: "Viewer" },
		],
	},
	{
		accessorKey: "team",
		header: "Team",
		enableColumnFilter: true,
		filterFn: "fuzzy",
	},
];

const meta = {
	title: "Components/Table",
	component: Table,
	tags: ["autodocs"],
	parameters: {
		layout: "fullscreen",
		docs: {
			description: {
				component:
					"A responsive data table with sorting, column filters, visibility controls, resizing, and pagination.",
			},
		},
	},
	argTypes: {
		data: {
			control: false,
			description: "Rows to render.",
			table: { type: { summary: "any[]" } },
		},
		columnDef: {
			control: false,
			description: "Column accessors, labels, filters, sizing, and cell renderers.",
			table: { type: { summary: "TableColumnDef[]" } },
		},
		pageSize: {
			control: "number",
			description: "Number of rows shown on each page.",
			table: { type: { summary: "number" }, defaultValue: { summary: "10" } },
		},
		className: {
			control: "text",
			description: "Additional classes for the table wrapper.",
			table: { type: { summary: "string" }, defaultValue: { summary: '""' } },
		},
		showHeader: {
			control: "boolean",
			description: "Show the table toolbar and pagination controls.",
			table: { type: { summary: "boolean" }, defaultValue: { summary: "true" } },
		},
		showFilters: {
			control: "boolean",
			description: "Show column filter controls.",
			table: { type: { summary: "boolean" }, defaultValue: { summary: "true" } },
		},
		showSorting: {
			control: "boolean",
			description: "Show sorting controls and sortable column headers.",
			table: { type: { summary: "boolean" }, defaultValue: { summary: "true" } },
		},
	},
	args: {
		data,
		columnDef,
		pageSize: 10,
		className: "",
		showHeader: true,
		showFilters: true,
		showSorting: true,
	},
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Compact: Story = {
	args: {
		showHeader: false,
		showFilters: false,
		showSorting: false,
	},
};
