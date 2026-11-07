import type { Meta, StoryObj } from "@storybook/react-vite";
import { useEffect, useState } from "react";
import { Pill } from "../components";

type PillStoryArgs = React.ComponentProps<typeof Pill> & {
	selection: string;
};

const meta = {
	title: "Components/Pill",
	component: Pill,
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: { component: "A rounded pill button that can be marked active, used for tabs and navigation." },
		},
	},
	argTypes: {
		active: {
			control: "boolean",
			description: "Marks the pill as selected and sets its pressed state.",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" },
			},
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
			description: "Visual style. Use pill for tabs and navigation or a semantic button-style variant.",
			table: { type: { summary: "PillVariant" }, defaultValue: { summary: "pill" } },
		},
		size: {
			control: "inline-radio",
			options: ["sm", "md"],
			description: "Button size.",
			table: { type: { summary: '"sm" | "md"' }, defaultValue: { summary: "md" } },
		},
		children: {
			control: false,
			table: { disable: true },
		},
		selection: {
			control: "text",
			description: "Initial selection used by the interactive story.",
			table: {
				type: { summary: "string" },
			},
		},
	},
	args: {
		active: false,
		variant: "pill",
		size: "md",
		children: null,
		selection: "/workspace",
	},
} satisfies Meta<PillStoryArgs>;

export default meta;
type Story = StoryObj<PillStoryArgs>;

export const Default: Story = {
	render: (args) => {
		const [selection, setSelection] = useState(args.selection);
		useEffect(() => setSelection(args.selection), [args.selection]);
		const options = [
			["/workspace", "Workspace"],
			["/account", "Account"],
			["/help", "Help"],
		] as const;

		return (
			<div className="flex w-full min-w-0 flex-col items-center gap-3">
				<div className="flex w-full min-w-0 flex-nowrap items-center justify-center gap-3 overflow-x-auto p-2">
					{options.map(([path, label]) => (
						<Pill
							key={path}
							variant={args.variant}
							size={args.size}
							active={selection === path}
							className="w-fit shrink-0"
							onClick={() => setSelection(path)}
						>
							{label}
						</Pill>
					))}
				</div>
				<p className="max-w-full break-all text-center text-sm text-muted-foreground">Current selection: {selection}</p>
			</div>
		);
	},
};
