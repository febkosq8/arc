import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { fn } from "storybook/test";
import { PillLink } from "../components";

const meta = {
	title: "Components/PillLink",
	component: PillLink,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
		controls: {
			exclude: ["href", "onClick", "children"],
		},
		docs: {
			description: {
				component:
					"A navigation link with pill, primary, and outline styles. Set active to highlight the current page and mark it with aria-current.",
			},
		},
	},
	argTypes: {
		active: {
			control: "boolean",
			description: "Marks the link as the current page and sets aria-current.",
			table: { type: { summary: "boolean" }, defaultValue: { summary: "false" } },
		},
		variant: {
			control: "inline-radio",
			options: ["pill", "primary", "outline"],
			description: "Visual style. Use pill for navigation links and primary or outline for button-style links.",
			table: { type: { summary: '"pill" | "primary" | "outline"' }, defaultValue: { summary: "pill" } },
		},
		size: {
			control: "inline-radio",
			options: ["sm", "md"],
			description: "Button-style link size.",
			table: { type: { summary: '"sm" | "md"' }, defaultValue: { summary: "md" } },
		},
		href: {
			control: false,
			description: "Destination URL of the link.",
			table: { type: { summary: "string" } },
		},
		children: {
			control: false,
			description: "Link label.",
			table: { type: { summary: "ReactNode" } },
		},
	},
	args: { active: false, variant: "pill", size: "md", href: "#workspace", children: "Workspace", onClick: fn() },
} satisfies Meta<typeof PillLink>;

export default meta;
type Story = StoryObj<typeof meta>;

const links = [
	["/workspace", "Workspace"],
	["/projects", "Projects"],
	["/account", "Account"],
	["/billing", "Billing"],
	["/help", "Help"],
] as const;

export const Default: Story = {
	render: (args) => (
		<PillLink
			{...args}
			onClick={(e) => {
				e.preventDefault();
				args.onClick?.(e);
			}}
		/>
	),
};

export const Navigation: Story = {
	args: { active: true },
	render: (args) => {
		const [path, setPath] = useState<string>(links[0][0]);

		return (
			<div className="flex flex-col items-center gap-4">
				<nav className="flex flex-wrap items-center justify-center gap-3">
					{links.map(([href, label]) => (
						<PillLink
							{...args}
							key={href}
							href={href}
							active={args.active && path === href}
							onClick={(e) => {
								e.preventDefault();
								args.onClick?.(e);
								setPath(href);
							}}
						>
							{label}
						</PillLink>
					))}
				</nav>
				<p className="text-muted-foreground">
					Current path: <span className="font-medium text-foreground">{path}</span>
				</p>
			</div>
		);
	},
};
