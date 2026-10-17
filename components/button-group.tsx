import { cx } from "@rinzai/zen";
import { Children, cloneElement, isValidElement, type ComponentPropsWithoutRef, type ReactNode } from "react";

type ButtonVariant =
	| "primary"
	| "secondary"
	| "destructive"
	| "ghost"
	| "warning"
	| "outline-primary"
	| "outline-secondary"
	| "outline-destructive"
	| "outline-ghost"
	| "outline-warning";

export interface ButtonGroupProps extends ComponentPropsWithoutRef<"div"> {
	orientation?: "horizontal" | "vertical";
	selectedVariant?: ButtonVariant;
}

const ButtonGroup = ({
	className,
	orientation = "horizontal",
	selectedVariant,
	children,
	...props
}: ButtonGroupProps) => (
	<div
		role="group"
		className={cx(
			"arc-button-group inline-flex w-fit gap-0 overflow-hidden rounded-md border border-border",
			"[&>.arc-button]:rounded-none! [&>.arc-button:not(:first-child)]:border-l [&>.arc-button:not(:first-child)]:border-border",
			"[&>.arc-double-click-button]:z-1 [&>.arc-double-click-button]:m-0 [&>.arc-double-click-button]:rounded-none! [&>.arc-double-click-button]:p-0",
			"[&>.arc-double-click-button>.arc-button]:rounded-none! [&>.arc-double-click-button>.arc-double-click-progress-ring]:inset-0 [&>.arc-double-click-button>.arc-double-click-progress-ring]:z-2 [&>.arc-double-click-button>.arc-double-click-progress-ring]:rounded-[inherit]",
			"[&>.arc-long-press-button]:z-1 [&>.arc-long-press-button]:m-0 [&>.arc-long-press-button]:rounded-none! [&>.arc-long-press-button]:p-0",
			"[&>.arc-long-press-button>.arc-button]:rounded-none! [&>.arc-long-press-button>.arc-double-click-progress-ring]:inset-0 [&>.arc-long-press-button>.arc-double-click-progress-ring]:z-2 [&>.arc-long-press-button>.arc-double-click-progress-ring]:rounded-[inherit]",
			orientation === "vertical" &&
				"flex-col items-stretch [&>.arc-button]:w-full [&>.arc-double-click-button]:w-full [&>.arc-long-press-button]:w-full [&>.arc-button:not(:first-child)]:border-t [&>.arc-button:not(:first-child)]:border-l-0 [&>.arc-double-click-button:not(:first-child)]:border-t [&>.arc-double-click-button:not(:first-child)]:border-l-0 [&>.arc-long-press-button:not(:first-child)]:border-t [&>.arc-long-press-button:not(:first-child)]:border-l-0 [&>.arc-double-click-button:first-child]:rounded-t-md [&>.arc-double-click-button:last-child]:rounded-b-md [&>.arc-long-press-button:first-child]:rounded-t-md [&>.arc-long-press-button:last-child]:rounded-b-md",
			orientation === "horizontal" &&
				"[&>.arc-double-click-button:not(:first-child)]:border-l [&>.arc-double-click-button:not(:first-child)]:border-border [&>.arc-long-press-button:not(:first-child)]:border-l [&>.arc-long-press-button:not(:first-child)]:border-border [&>.arc-double-click-button:first-child]:rounded-l-md [&>.arc-double-click-button:last-child]:rounded-r-md [&>.arc-long-press-button:first-child]:rounded-l-md [&>.arc-long-press-button:last-child]:rounded-r-md",
			className,
		)}
		{...props}
	>
		{Children.map(children as ReactNode, (child) => {
			if (!selectedVariant || !isValidElement<{ "aria-pressed"?: boolean; variant?: ButtonVariant }>(child)) {
				return child;
			}

			return child.props["aria-pressed"] === true ? cloneElement(child, { variant: selectedVariant }) : child;
		})}
	</div>
);

export default ButtonGroup;
