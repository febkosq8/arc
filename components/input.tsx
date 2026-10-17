import { cva, cx, type VariantProps } from "@rinzai/zen";
import { ComponentPropsWithoutRef } from "react";

const inputVariants = cva(
	"arc-input rounded border text-foreground placeholder:text-muted-foreground focus:border-transparent focus:outline-hidden focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:border-muted disabled:bg-muted",
	{
		variants: {
			variant: {
				default: "border-border bg-background",
				ghost: "border-transparent bg-transparent",
			},
			as: {
				input: "h-10 p-1 pl-2",
				textarea: "min-h-50 max-h-250 resize-y overflow-auto! p-2 whitespace-pre-wrap",
			},
		},
		defaultVariants: {
			variant: "default",
			as: "input",
		},
	},
);

export type InputProps =
	| (ComponentPropsWithoutRef<"input"> & VariantProps<typeof inputVariants> & { as?: "input" })
	| (ComponentPropsWithoutRef<"textarea"> & VariantProps<typeof inputVariants> & { as: "textarea" });

const Input = ({ as = "input", className, variant, ...rest }: InputProps) => {
	const classNames = cx(inputVariants({ as, variant }), className);

	if (as === "textarea") {
		return <textarea {...(rest as ComponentPropsWithoutRef<"textarea">)} autoComplete="off" className={classNames} />;
	}

	return <input {...(rest as ComponentPropsWithoutRef<"input">)} autoComplete="off" className={classNames} />;
};

export default Input;
