import type { Meta, StoryObj } from "@storybook/react-vite";
import { useEffect, useState } from "react";
import { Button, Modal } from "../components";

const meta = {
	title: "Components/Modal",
	component: Modal,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
		docs: { description: { component: "A modal dialog with header, body and footer areas and a configurable size." } },
	},
	argTypes: {
		open: {
			control: "boolean",
			description: "Whether the modal is visible.",
			table: { type: { summary: "boolean" }, defaultValue: { summary: "false" } },
		},
		headerContent: {
			control: "text",
			description: "Content rendered in the modal header.",
			table: { type: { summary: "ReactNode" } },
		},
		footerContent: {
			control: false,
			description: "Content rendered in the modal footer, typically action buttons.",
			table: { type: { summary: "ReactNode" } },
		},
		width: {
			control: "text",
			description: "Modal width as a CSS value, such as 28rem.",
			table: { type: { summary: "string" } },
		},
		height: {
			control: "text",
			description: "Modal height as a CSS value. Leave empty to fit the content.",
			table: { type: { summary: "string" } },
		},
		children: { control: false, table: { disable: true } },
		setOpen: { control: false, table: { disable: true } },
		initialFocus: { control: false, table: { disable: true } },
		customKeyHandler: { control: false, table: { disable: true } },
	},
	args: {
		open: false,
		headerContent: "Modal title",
		width: "28rem",
		height: "",
		setOpen: () => {},
		children: null,
	},
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: (args) => {
		const [open, setOpen] = useState(args.open ?? false);
		useEffect(() => setOpen(args.open ?? false), [args.open]);

		return (
			<>
				<Button variant="outline-primary" onClick={() => setOpen(true)}>
					Open modal
				</Button>
				<Modal
					{...args}
					open={open}
					setOpen={setOpen}
					footerContent={
						<div className="flex justify-end gap-3">
							<Button variant="outline-secondary" onClick={() => setOpen(false)}>
								Cancel
							</Button>
							<Button variant="primary" onClick={() => setOpen(false)}>
								Confirm
							</Button>
						</div>
					}
				>
					<p className="text-foreground">Press Escape or use the buttons to close this modal.</p>
				</Modal>
			</>
		);
	},
};
