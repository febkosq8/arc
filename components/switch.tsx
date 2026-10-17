import { Switch as BaseSwitch } from "@base-ui/react/switch";
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
		<BaseSwitch.Root
			checked={checked}
			disabled={disabled}
			onCheckedChange={onChange}
			className={cx("arc-switch", SwitchVariants({ variant, disabled }))}
			{...rest}
		>
			{children ? (
				children(checked)
			) : (
				<BaseSwitch.Thumb
					aria-hidden="true"
					className={SwitchThumbVariants({ variant, checked, disabled })}
				/>
			)}
		</BaseSwitch.Root>
	);
};

const SwitchVariants = cva(
	"relative inline-flex h-7 w-12 items-center rounded-full border border-border bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:not-data-disabled:ring-2 hover:not-data-disabled:ring-ring/60 data-disabled:cursor-not-allowed data-disabled:opacity-60",
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
				false: "left-1 border-foreground/60 bg-background",
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
			{
				variant: "primary",
				checked: false,
				disabled: false,
				className: "bg-primary/70",
			},
			{
				variant: "secondary",
				checked: false,
				disabled: false,
				className: "bg-secondary/70",
			},
			{
				variant: "danger",
				checked: false,
				disabled: false,
				className: "bg-destructive/70",
			},
			{
				variant: "success",
				checked: false,
				disabled: false,
				className: "bg-success/70",
			},
			{
				variant: "primary",
				checked: false,
				disabled: true,
				className: "border-primary bg-primary/70",
			},
			{
				variant: "secondary",
				checked: false,
				disabled: true,
				className: "border-secondary bg-secondary/70",
			},
			{
				variant: "secondary",
				checked: false,
				disabled: true,
				className: "border-secondary-foreground/70 bg-secondary-foreground/40",
			},
			{
				variant: "danger",
				checked: false,
				disabled: true,
				className: "border-destructive bg-destructive/70",
			},
			{
				variant: "success",
				checked: false,
				disabled: true,
				className: "border-success bg-success/70",
			},
		],
	},
);

export default Switch;
