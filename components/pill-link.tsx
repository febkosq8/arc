import { cva, cx } from "@rinzai/zen";

export interface PillLinkProps extends React.ComponentPropsWithoutRef<"a"> {
	href: string;
	active?: boolean;
	variant?: "pill" | "primary" | "outline";
	size?: "sm" | "md";
}

const pillLinkVariants = cva(
	"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
	{
		variants: {
			variant: {
				pill: "arc-pill-link min-w-fit border border-transparent text-base text-muted-foreground transition hover:text-primary hover:outline-none hover:ring-0 focus:outline-none focus-visible:ring-opacity-75",
				primary: "bg-primary text-primary-foreground! hover:bg-primary/90",
				outline: "border border-foreground/40 bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground",
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
	return (
		<a
			className={cx(
				pillLinkVariants({ variant, size }),
				active &&
					{
						pill: "text-primary!",
						primary: "bg-primary/80 ring-2 ring-ring ring-offset-2",
						outline: "border-primary bg-accent text-primary",
					}[variant],
				className,
			)}
			aria-current={active ? "page" : undefined}
			{...props}
		/>
	);
};

export default PillLink;
