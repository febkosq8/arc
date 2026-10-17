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
				<div className="flex w-full min-w-0 flex-nowrap items-center justify-center gap-3 overflow-x-auto">
					{options.map(([path, label]) => (
						<Pill key={path} active={selection === path} className="w-fit shrink-0" onClick={() => setSelection(path)}>
							{label}
						</Pill>
					))}
				</div>
				<p className="max-w-full break-all text-center text-sm text-muted-foreground">Current selection: {selection}</p>
			</div>
		);
	},
};
