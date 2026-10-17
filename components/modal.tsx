import { Dialog } from "@base-ui/react/dialog";
import { cx } from "@rinzai/zen";
import { useEffect } from "react";

export interface ModalProps {
	open?: boolean;
	setOpen: (open: boolean) => void;
	children: React.ReactNode;
	initialFocus?: React.RefObject<HTMLElement | null>;
	headerContent?: React.ReactNode;
	footerContent?: React.ReactNode;
	width?: string;
	height?: string;
	className?: string;
	/** Called with a normalized key name (`esc` or `ctrl+s`) while the modal is open. */
	customKeyHandler?: (keyname: string, e: KeyboardEvent) => void;
}

const Modal = ({
	open = false,
	setOpen,
	children,
	initialFocus,
	headerContent,
	footerContent,
	width,
	height,
	className,
	customKeyHandler,
}: ModalProps) => {
	useEffect(() => {
		if (!open) return;
		const onKeyDown = (e: KeyboardEvent) => {
			const keyname =
				e.key === "Escape" ? "esc" : (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s" ? "ctrl+s" : null;
			if (!keyname) return;
			e.preventDefault();
			if (keyname === "esc") setOpen(false);
			customKeyHandler?.(keyname, e);
		};
		window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
	}, [open, setOpen, customKeyHandler]);

	return (
		<Dialog.Root open={open} onOpenChange={setOpen}>
			<Dialog.Portal>
				<Dialog.Backdrop
					className={cx(
						"fixed inset-0 z-10 bg-black/80 transition-opacity duration-300",
						"data-ending-style:opacity-0 data-starting-style:opacity-0",
					)}
				/>
				<Dialog.Viewport className="fixed inset-0 z-10 flex min-h-dvh items-center justify-center p-4">
					<Dialog.Popup
						initialFocus={initialFocus}
						className={cx(
							"arc-modal flex max-h-full w-fit max-w-full flex-col overflow-auto rounded-md border border-border bg-card p-6 text-left align-middle text-foreground shadow-xl",
							"transition-all duration-300",
							"data-starting-style:scale-95 data-starting-style:opacity-0",
							"data-ending-style:scale-95 data-ending-style:opacity-0",
							className,
						)}
						style={{ width, height }}
					>
						<Dialog.Title className="mb-4 border-b border-border pb-2 text-lg font-bold leading-6 text-foreground">
							{headerContent}
						</Dialog.Title>
						<div className="grow">{children}</div>
						{footerContent && <div className="mt-auto border-t border-border pt-2">{footerContent}</div>}
					</Dialog.Popup>
				</Dialog.Viewport>
			</Dialog.Portal>
		</Dialog.Root>
	);
};

export default Modal;
