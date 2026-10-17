import type { Meta, StoryObj } from "@storybook/react-vite";
import { useEffect, useState } from "react";
import { Menu, Pill } from "../components";

type MenuStoryArgs = React.ComponentProps<typeof Menu> & {
	selection: string;
};

const meta = {
	title: "Components/Menu",
	component: Menu,
	tags: ["autodocs"],
	args: {
		active: false,
		activeClassName: "",
		children: null,
		selection: "/account/profile",
	},
	argTypes: {
		active: { control: "boolean" },
		activeClassName: { 
			control: false, 
			table: { disable: true } 
		},
		selection: { control: "text" },
		className: {
			control: false,
			table: { disable: true },
		},
		children: {
			control: false,
			table: { disable: true },
		},
	},
	parameters: {
		layout: "centered",
	},
} satisfies Meta<MenuStoryArgs>;

export default meta;
type Story = StoryObj<MenuStoryArgs>;

export const Default: Story = {
	render: (args) => {
		const [selection, setSelection] = useState(args.selection);
		useEffect(() => setSelection(args.selection), [args.selection]);

		return (
			<div className="flex w-full min-w-0 flex-col items-center gap-3">
				<div className="flex w-full min-w-0 flex-col items-center gap-4 sm:flex-row sm:flex-wrap sm:justify-center">
					<Menu
						active={selection.startsWith("/workspace/")}
						activeClassName={args.activeClassName}
						buttonText="Workspace"
					>
						<Menu.Item active={selection === "/workspace/overview"} asChild>
							<Pill onClick={() => setSelection("/workspace/overview")}>Overview</Pill>
						</Menu.Item>
						<Menu.Item active={selection === "/workspace/projects"} asChild>
							<Pill onClick={() => setSelection("/workspace/projects")}>Projects</Pill>
						</Menu.Item>
						<Menu.Item active={selection === "/workspace/activity"} asChild>
							<Pill onClick={() => setSelection("/workspace/activity")}>Activity</Pill>
						</Menu.Item>
					</Menu>
					<Menu active={selection.startsWith("/account/")} activeClassName={args.activeClassName} buttonText="Account">
						<Menu.Sub buttonText="Settings">
							<Menu.Item active={selection === "/account/profile"} asChild>
								<Pill onClick={() => setSelection("/account/profile")}>Profile</Pill>
							</Menu.Item>
							<Menu.Item active={selection === "/account/security"} asChild>
								<Pill onClick={() => setSelection("/account/security")}>Security</Pill>
							</Menu.Item>
							<Menu.Item active={selection === "/account/preferences"} asChild>
								<Pill onClick={() => setSelection("/account/preferences")}>Preferences</Pill>
							</Menu.Item>
						</Menu.Sub>
						<Menu.Item active={selection === "/account/notifications"} asChild>
							<Pill onClick={() => setSelection("/account/notifications")}>Notifications</Pill>
						</Menu.Item>
						<Menu.Item active={selection === "/account/billing"} asChild>
							<Pill onClick={() => setSelection("/account/billing")}>Billing</Pill>
						</Menu.Item>
					</Menu>
					<Menu active={selection.startsWith("/help/")} activeClassName={args.activeClassName} buttonText="Help">
						<Menu.Item active={selection === "/help/docs"} asChild>
							<Pill onClick={() => setSelection("/help/docs")}>Documentation</Pill>
						</Menu.Item>
						<Menu.Item active={selection === "/help/shortcuts"} asChild>
							<Pill onClick={() => setSelection("/help/shortcuts")}>Keyboard shortcuts</Pill>
						</Menu.Item>
						<Menu.Item active={selection === "/help/support"} asChild>
							<Pill onClick={() => setSelection("/help/support")}>Contact support</Pill>
						</Menu.Item>
					</Menu>
				</div>
				<p className="max-w-full break-all text-center text-sm text-muted-foreground">Current selection: {selection}</p>
			</div>
		);
	},
};
