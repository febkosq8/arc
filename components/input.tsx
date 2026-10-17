import { cva, cx, type VariantProps } from "@rinzai/zen";
import { ComponentPropsWithoutRef } from "react";

const inputVariants = cva(
	"arc-input h-10 rounded border p-1 pl-2 placeholder:text-muted-foreground text-foreground focus:ring-ring focus:border-transparent focus:ring-2 focus:outline-hidden disabled:border-muted disabled:bg-muted disabled:cursor-not-allowed whitespace-pre-wrap",
	{
		variants: {
			variant: {
				default: "border-border bg-background",
				ghost: "border-transparent bg-transparent",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

export interface InputProps extends ComponentPropsWithoutRef<"input">, VariantProps<typeof inputVariants> {}

const Input = ({ className, variant, ...rest }: InputProps) => {
	return <input {...rest} autoComplete="off" className={cx(inputVariants({ variant }), className)} />;
};

export default Input;
