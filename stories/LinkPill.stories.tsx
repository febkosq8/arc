import type { Meta, StoryObj } from "@storybook/react-vite";
import { useEffect, useState } from "react";
import { LinkPill } from "../components";

const meta = {
	title: "Components/LinkPill",
	component: LinkPill,
	tags: ["autodocs"],
	parameters: { layout: "centered" },
	argTypes: {
		active: {
			control: "boolean",
			description: "Marks the link as the current page and sets aria-current.",
			table: { type: { summary: "boolean" }, defaultValue: { summary: "false" } },
		},
		href: { control: "text", table: { type: { summary: "string" } } },
		children: { control: "text", table: { type: { summary: "ReactNode" } } },
	},
	args: { active: false, href: "#workspace", children: "Workspace" },
} satisfies Meta<typeof LinkPill>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: (args) => {
		const [selection, setSelection] = useState(args.active ? "#workspace" : "");
		useEffect(() => setSelection(args.active ? "#workspace" : ""), [args.active]);
		const options = [
			["#workspace", "Workspace"],
			["#account", "Account"],
			["#help", "Help"],
		] as const;

		return (
			<div className="flex flex-wrap items-center justify-center gap-3">
				{options.map(([href, label]) => (
					<LinkPill
						key={href}
						href={href}
						active={selection === href}
						onClick={(e) => {
							e.preventDefault();
							setSelection(href);
						}}
					>
						{label}
					</LinkPill>
				))}
			</div>
		);
	},
};
