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
			"arc-button-group",
			"inline-flex w-fit overflow-hidden rounded-md border border-border",
			orientation === "vertical" && "arc-button-group-vertical flex-col items-stretch",
			orientation === "horizontal" && "arc-button-group-horizontal",
			className,
		)}
		{...props}
	>
		{Children.map(children as ReactNode, (child) => {
			if (!selectedVariant || !isValidElement<{ "aria-pressed"?: boolean; variant?: ButtonVariant }>(child)) {
				return child;
			}

			return child.props["aria-pressed"] === true
				? cloneElement(child, { variant: selectedVariant })
				: child;
		})}
	</div>
);

export default ButtonGroup;
