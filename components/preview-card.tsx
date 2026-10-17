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
}

const PreviewCard = ({
	cardContent,
	children,
	trigger = "hover",
	triggerRender,
	side = "bottom",
	align = "center",
	className,
}: PreviewCardProps) => (
	<Popover.Root>
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
						"data-[side=bottom]:before:absolute data-[side=bottom]:before:top-0 data-[side=bottom]:before:left-1/2 data-[side=bottom]:before:h-3 data-[side=bottom]:before:w-3 data-[side=bottom]:before:-translate-x-1/2 data-[side=bottom]:before:-translate-y-1/2 data-[side=bottom]:before:rotate-45",
						"data-[side=bottom]:before:border-t data-[side=bottom]:before:border-l data-[side=bottom]:before:border-border data-[side=bottom]:before:bg-popover",
						className,
					)}
				>
					{cardContent}
				</Popover.Popup>
			</Popover.Positioner>
		</Popover.Portal>
	</Popover.Root>
);

export default PreviewCard;
