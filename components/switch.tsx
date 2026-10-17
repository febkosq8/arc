import { Switch as SwitchBase } from "@headlessui/react";
import { cva, cx } from "@rinzai/zen";
import { JSX } from "react";
export interface SwitchProps {
	checked?: boolean;
	onChange?: (checked: boolean) => void;
	disabled?: boolean;
	variant?: "primary" | "secondary" | "danger" | "success";
	children?: (checked: boolean) => JSX.Element;
}
const Switch = ({
	checked = false,
	onChange,
	disabled = false,
	variant = "primary",
	children,
	...rest
}: SwitchProps) => {
	return (
		<SwitchBase
			checked={checked}
			disabled={disabled}
			onChange={onChange}
			className={cx("arc-switch", SwitchVariants({ variant, disabled }))}
			{...rest}
		>
			{children ? (
				children(checked)
			) : (
				<div className="relative h-full w-full">
					<span
						aria-hidden="true"
						className={SwitchThumbVariants({ variant, checked, disabled })}
					/>
				</div>
			)}
		</SwitchBase>
	);
};

const SwitchVariants = cva(
	"relative inline-flex h-7 w-12 items-center rounded-full bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:ring-2 hover:ring-ring/60 disabled:cursor-not-allowed disabled:opacity-60",
	{
		variants: {
			variant: {
				danger: "data-checked:bg-destructive",
				success: "data-checked:bg-success",
				primary: "data-checked:bg-primary",
				secondary: "data-checked:bg-secondary",
			},
			disabled: {
				true: "ring-2 ring-border",
				false: "",
			},
		},
	},
);

const SwitchThumbVariants = cva(
	"absolute top-1/2 inline-block h-5 w-5 -translate-y-1/2 transform rounded-full border shadow-sm transition-[left,background-color,border-color] duration-300 ease-out",
	{
		variants: {
			variant: {
				primary: "",
				secondary: "",
				danger: "",
				success: "",
			},
			checked: {
				true: "left-6",
				false: "left-1 border-border bg-background",
			},
			disabled: {
				true: "border-muted-foreground bg-muted-foreground",
				false: "",
			},
		},
		compoundVariants: [
			{
				variant: "primary",
				checked: true,
				className: "border-primary-foreground bg-primary-foreground",
			},
			{
				variant: "secondary",
				checked: true,
				className: "border-secondary-foreground bg-secondary-foreground",
			},
			{
				variant: "danger",
				checked: true,
				className: "border-destructive-foreground bg-destructive-foreground",
			},
			{
				variant: "success",
				checked: true,
				className: "border-success-foreground bg-success-foreground",
			},
		],
	},
);

export default Switch;
