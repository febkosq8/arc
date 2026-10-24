import { cva, cx } from "@rinzai/zen";

export type PillLinkVariant =
	| "pill"
	| "primary"
	| "secondary"
	| "success"
	| "destructive"
	| "ghost"
	| "warning"
	| "outline"
	| "outline-primary"
	| "outline-secondary"
	| "outline-success"
	| "outline-destructive"
	| "outline-ghost"
	| "outline-warning";

export interface PillLinkProps extends React.ComponentPropsWithoutRef<"a"> {
	href: string;
	active?: boolean;
	variant?: PillLinkVariant;
	size?: "sm" | "md";
}

const pillLinkVariants = cva(
	"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
	{
		variants: {
			variant: {
				pill: "arc-pill-link min-w-fit border border-transparent text-base text-muted-foreground! transition hover:text-primary! hover:outline-none hover:ring-0 focus:outline-none focus-visible:ring-opacity-75",
				primary: "bg-primary text-primary-foreground! hover:bg-primary/90",
				secondary: "bg-secondary text-secondary-foreground! hover:bg-secondary/80",
				success: "bg-success text-success-foreground! hover:bg-success/90",
				destructive: "bg-destructive text-destructive-foreground! hover:bg-destructive/90",
				ghost: "text-foreground! hover:bg-accent hover:text-accent-foreground!",
				warning: "bg-warning text-warning-foreground! hover:bg-warning/90",
				outline: "border border-foreground/40 bg-transparent text-foreground! hover:bg-accent hover:text-accent-foreground!",
				"outline-primary":
					"border border-primary bg-background text-primary! hover:bg-primary hover:text-primary-foreground!",
				"outline-secondary":
					"border border-secondary-foreground bg-background text-secondary-foreground! hover:bg-secondary",
				"outline-success":
					"border border-success bg-background text-success! hover:bg-success hover:text-success-foreground!",
				"outline-destructive":
					"border border-destructive bg-background text-destructive! hover:bg-destructive hover:text-destructive-foreground!",
				"outline-ghost":
					"border border-transparent bg-background text-foreground! hover:bg-accent hover:text-accent-foreground!",
				"outline-warning":
					"border border-warning bg-background text-warning! hover:bg-warning hover:text-warning-foreground!",
			},
			size: {
				sm: "h-9 px-3",
				md: "h-10 px-4 py-2",
			},
		},
		compoundVariants: [{ variant: "pill", size: "md", class: "h-10 pointer-coarse:h-11 px-3 py-2" }],
		defaultVariants: {
			variant: "pill",
			size: "md",
		},
	},
);

const PillLink = ({ active = false, className, size = "md", variant = "pill", ...props }: PillLinkProps) => {
	const activeStyles: Record<PillLinkVariant, string> = {
		pill: "text-primary!",
		primary: "bg-primary/80 text-primary-foreground! ring-2 ring-ring ring-offset-2",
		secondary: "bg-secondary/90 ring-2 ring-ring ring-offset-2",
		success: "bg-success/80 text-success-foreground! ring-2 ring-success ring-offset-2",
		destructive: "bg-destructive/80 text-destructive-foreground! ring-2 ring-destructive ring-offset-2",
		ghost: "bg-accent text-accent-foreground!",
		warning: "bg-warning/80 text-warning-foreground! ring-2 ring-warning ring-offset-2",
		outline: "border-primary bg-accent text-primary!",
		"outline-primary": "bg-primary text-primary-foreground! ring-2 ring-primary ring-offset-2",
		"outline-secondary":
			"bg-secondary text-secondary-foreground! ring-2 ring-secondary-foreground ring-offset-2",
		"outline-success": "bg-success text-success-foreground! ring-2 ring-success ring-offset-2",
		"outline-destructive": "bg-destructive text-destructive-foreground! ring-2 ring-destructive ring-offset-2",
		"outline-ghost": "bg-accent text-accent-foreground! ring-2 ring-ring ring-offset-2",
		"outline-warning": "bg-warning text-warning-foreground! ring-2 ring-warning ring-offset-2",
	};

	return (
		<a
			className={cx(
				pillLinkVariants({ variant, size }),
				active && activeStyles[variant],
				className,
			)}
			aria-current={active ? "page" : undefined}
			{...props}
		/>
	);
};

export default PillLink;
