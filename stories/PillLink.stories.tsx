import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { fn } from "storybook/test";
import { PillLink, type PillLinkVariant } from "../components";

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
					"A navigation link with pill, semantic button-style, and outline variants. Set active to highlight the current page and mark it with aria-current.",
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
			options: [
				"pill",
				"primary",
				"secondary",
				"success",
				"destructive",
				"ghost",
				"warning",
				"outline",
				"outline-primary",
				"outline-secondary",
				"outline-success",
				"outline-destructive",
				"outline-ghost",
				"outline-warning",
			],
			description: "Visual style. Use pill for navigation or a semantic button-style variant.",
			table: { type: { summary: "PillLinkVariant" }, defaultValue: { summary: "pill" } },
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

export const Variants: Story = {
	render: (args) => {
		const variants = [
			"pill",
			"primary",
			"secondary",
			"success",
			"destructive",
			"ghost",
			"warning",
			"outline",
			"outline-primary",
			"outline-secondary",
			"outline-success",
			"outline-destructive",
			"outline-ghost",
			"outline-warning",
		] as const satisfies readonly PillLinkVariant[];

		return (
			<div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
				{variants.map((variant) => (
					<div key={variant} className="flex flex-col items-center gap-2">
						<PillLink
							{...args}
							href={`#${variant}`}
							variant={variant}
							onClick={(event) => {
								event.preventDefault();
								args.onClick?.(event);
							}}
						>
							{variant}
						</PillLink>
						<span className="text-xs text-muted-foreground">{variant}</span>
					</div>
				))}
			</div>
		);
	},
	args: { ...meta.args, size: "md", active: false },
	parameters: {
		docs: {
			description: {
				story:
					"A comparison of every PillLink variant, including the semantic and outline variants shared with Button.",
			},
		},
	},
};

export const Sizes: Story = {
	render: (args) => (
		<div className="flex flex-wrap items-end gap-4">
			{(["sm", "md"] as const).map((size) => (
				<div key={size} className="flex flex-col items-center gap-2">
					<PillLink {...args} size={size}>
						{size}
					</PillLink>
					<span className="text-xs text-muted-foreground">{size}</span>
				</div>
			))}
		</div>
	),
	args: { ...meta.args, variant: "outline-primary" },
	parameters: {
		docs: {
			description: {
				story: "A comparison of every predefined PillLink size.",
			},
		},
	},
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
