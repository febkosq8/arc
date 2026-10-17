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
	argTypes: {
		active: { control: "boolean" },
		className: {
			control: false,
			table: { disable: true },
		},
		children: {
			control: false,
			table: { disable: true },
		},
		autoComplete: {
			control: false,
			table: { disable: true },
		},
		selection: { control: "text" },
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
				<div className="flex w-full min-w-0 flex-wrap items-center justify-center gap-3">
					{options.map(([path, label]) => (
						<Pill key={path} active={selection === path} onClick={() => setSelection(path)}>
							{label}
						</Pill>
					))}
				</div>
				<p className="max-w-full break-all text-center text-sm text-muted-foreground">Current selection: {selection}</p>
			</div>
		);
	},
};
