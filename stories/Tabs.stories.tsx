import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tabs, TabsList, TabsPanel, TabsTab } from "../components";

type TabsStoryArgs = React.ComponentProps<typeof Tabs> & {
	disableLast: boolean;
};

const meta = {
	title: "Components/Tabs",
	component: Tabs,
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component:
					"Switch between related views with accessible, keyboard-navigable tabs. Compose Tabs, TabsList, TabsTab and TabsPanel.",
			},
		},
	},
	argTypes: {
		defaultValue: {
			control: "select",
			options: ["workspace", "account", "help"],
			description: "Initially selected tab (uncontrolled).",
			table: { type: { summary: "string" }, defaultValue: { summary: "0" } },
		},
		orientation: {
			control: "inline-radio",
			options: ["horizontal", "vertical"],
			description: "Layout and keyboard navigation direction.",
			table: { type: { summary: '"horizontal" | "vertical"' }, defaultValue: { summary: "horizontal" } },
		},
		disableLast: {
			control: "boolean",
			description: "Disables the last tab.",
			table: { type: { summary: "boolean" }, defaultValue: { summary: "false" } },
		},
		children: { control: false, table: { disable: true } },
	},
	args: {
		defaultValue: "workspace",
		orientation: "horizontal",
		disableLast: false,
		children: null,
	},
} satisfies Meta<TabsStoryArgs>;

export default meta;
type Story = StoryObj<TabsStoryArgs>;

export const Default: Story = {
	render: ({ disableLast, children: _children, ...args }) => (
		<Tabs {...args}>
			<TabsList>
				<TabsTab value="workspace">Workspace</TabsTab>
				<TabsTab value="account">Account</TabsTab>
				<TabsTab value="help" disabled={disableLast}>
					Help
				</TabsTab>
			</TabsList>
			<TabsPanel value="workspace">Workspace settings live here.</TabsPanel>
			<TabsPanel value="account">Manage your account.</TabsPanel>
			<TabsPanel value="help">Find answers and support.</TabsPanel>
		</Tabs>
	),
};
