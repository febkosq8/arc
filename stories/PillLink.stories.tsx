import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { PillLink } from "../components";

const meta = {
	title: "Components/PillLink",
	component: PillLink,
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
	args: { active: false, variant: "pill", size: "md", href: "#workspace", children: "Workspace" },
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
	render: (args) => <PillLink {...args} />,
};

export const Navigation: Story = {
	render: () => {
		const [path, setPath] = useState<string>(links[0][0]);

		return (
			<div className="flex flex-col items-center gap-4">
				<nav className="flex flex-wrap items-center justify-center gap-3">
					{links.map(([href, label]) => (
						<PillLink
							key={href}
							href={href}
							active={path === href}
							onClick={(e) => {
								e.preventDefault();
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
