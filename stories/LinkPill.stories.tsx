import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { LinkPill } from "../components";

const meta = {
	title: "Components/LinkPill",
	component: LinkPill,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"A pill-shaped navigation link. Set active to highlight the current page and mark it with aria-current.",
			},
		},
	},
	argTypes: {
		active: {
			control: false,
			description: "Marks the link as the current page and sets aria-current.",
			table: { type: { summary: "boolean" }, defaultValue: { summary: "false" } },
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
	args: { active: false, href: "#workspace", children: "Workspace" },
} satisfies Meta<typeof LinkPill>;

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
	render: () => {
		const [path, setPath] = useState<string>(links[0][0]);

		return (
			<div className="flex flex-col items-center gap-4">
				<nav className="flex flex-wrap items-center justify-center gap-3">
					{links.map(([href, label]) => (
						<LinkPill
							key={href}
							href={href}
							active={path === href}
							onClick={(e) => {
								e.preventDefault();
								setPath(href);
							}}
						>
							{label}
						</LinkPill>
					))}
				</nav>
				<p className="text-muted-foreground">
					Current path: <span className="font-medium text-foreground">{path}</span>
				</p>
			</div>
		);
	},
};
