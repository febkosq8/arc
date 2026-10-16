import { cx } from "@rinzai/zen";
import type { ComponentPropsWithoutRef } from "react";

export interface ButtonGroupProps extends ComponentPropsWithoutRef<"div"> {
	orientation?: "horizontal" | "vertical";
}

const ButtonGroup = ({ className, orientation = "horizontal", ...props }: ButtonGroupProps) => (
	<div
		role="group"
		className={cx(
			"inline-flex [&>button]:rounded-none [&>button:first-child]:rounded-l-md [&>button:last-child]:rounded-r-md [&>button:not(:first-child)]:border-l-0",
			orientation === "vertical" &&
				"flex-col [&>button:first-child]:rounded-l-none [&>button:first-child]:rounded-t-md [&>button:last-child]:rounded-r-none [&>button:last-child]:rounded-b-md [&>button:not(:first-child)]:border-l",
			className,
		)}
		{...props}
	/>
);

export default ButtonGroup;
