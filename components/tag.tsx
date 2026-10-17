import { cva, cx } from "@rinzai/zen";

export type TagVariant = "primary" | "secondary" | "success" | "warning" | "destructive" | "outline";

type VariantClassProps = { class?: never; className?: never } | { class?: never; className: string | undefined };

type TagVariantOptions = VariantClassProps & { variant?: TagVariant | null };

const tagVariants: (props?: TagVariantOptions) => string = cva(
	"arc-tag inline-flex w-fit items-center rounded-full border border-transparent px-1.5 py-0.5 text-xs font-bold",
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
		},
		defaultVariants: {
			variant: "primary",
		},
	},
);

export interface TagProps extends React.ComponentPropsWithoutRef<"div"> {
	variant?: TagVariant;
}

const Tag = ({ className, variant, ...props }: TagProps) => {
	return <div className={cx(tagVariants({ variant, className }))} {...props} />;
};

export default Tag;
