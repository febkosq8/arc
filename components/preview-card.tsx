import { Popover } from "@base-ui/react/popover";
import { cx } from "@rinzai/zen";
import { ReactElement, ReactNode } from "react";

export interface PreviewCardProps {
	cardContent: ReactNode;
	children: ReactNode;
	trigger?: "hover" | "click";
	triggerRender?: ReactElement;
	side?: "top" | "bottom" | "left" | "right";
	align?: "start" | "center" | "end";
	className?: string;
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
}

const PreviewCard = ({
	cardContent,
	children,
	trigger = "hover",
	triggerRender,
	side = "bottom",
	align = "center",
	className,
	open,
	onOpenChange,
}: PreviewCardProps) => (
	<Popover.Root open={open} onOpenChange={onOpenChange}>
		<Popover.Trigger
			nativeButton={!!triggerRender}
			openOnHover={trigger === "hover"}
			render={triggerRender ?? <span />}
		>
			{children}
		</Popover.Trigger>
		<Popover.Portal>
			<Popover.Positioner className="z-50" side={side} align={align} sideOffset={8}>
				<Popover.Popup
					className={cx(
						"arc-preview-card relative w-fit max-w-[calc(100vw-1rem)] rounded-md border border-border bg-popover px-2 py-3 text-foreground shadow-lg ring-1 ring-border/60",
						className,
					)}
				>
					<Popover.Arrow
						className={cx(
							"border-border bg-popover h-3 w-3 rotate-45",
							"data-[side=bottom]:-top-1.5 data-[side=bottom]:border-t data-[side=bottom]:border-l",
							"data-[side=top]:-bottom-1.5 data-[side=top]:border-r data-[side=top]:border-b",
							"data-[side=left]:-right-1.5 data-[side=left]:border-t data-[side=left]:border-r",
							"data-[side=right]:-left-1.5 data-[side=right]:border-b data-[side=right]:border-l",
						)}
					/>
					{cardContent}
				</Popover.Popup>
			</Popover.Positioner>
		</Popover.Portal>
	</Popover.Root>
);

export default PreviewCard;
