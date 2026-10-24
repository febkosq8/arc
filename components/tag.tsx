import { cva, cx } from "@rinzai/zen";

export type TagVariant = "primary" | "secondary" | "success" | "warning" | "destructive" | "outline";

type VariantClassProps = { class?: never; className?: never } | { class?: never; className: string | undefined };

export type TagSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";

type TagVariantOptions = VariantClassProps & {
	variant?: TagVariant | null;
	size?: TagSize | null;
};

const tagVariants: (props?: TagVariantOptions) => string = cva(
	"arc-tag inline-flex w-fit items-center rounded-full border border-transparent font-bold",
	{
		variants: {
			variant: {
				primary: "bg-primary text-primary-foreground",
				secondary: "border-border bg-secondary text-secondary-foreground",
				success: "bg-success text-success-foreground",
				warning: "bg-warning text-warning-foreground",
				destructive: "bg-destructive text-destructive-foreground",
				outline: "border-border bg-transparent text-foreground",
			},
			size: {
				xs: "px-1.5 py-0.5 text-xs",
				sm: "px-2 py-0.5 text-sm",
				md: "px-2.5 py-1 text-base",
				lg: "px-3 py-1.5 text-lg",
				xl: "px-3.5 py-2 text-xl",
				"2xl": "px-4 py-2.5 text-2xl",
				"3xl": "px-5 py-3 text-3xl",
			},
		},
		defaultVariants: {
			variant: "primary",
			size: "xs",
		},
	},
);

export interface TagProps extends React.ComponentPropsWithoutRef<"div"> {
	variant?: TagVariant;
	size?: TagSize;
}

const Tag = ({ className, variant, size, ...props }: TagProps) => {
	return <div className={cx(tagVariants({ variant, size, className }))} {...props} />;
};

export default Tag;
