import { cva, cx, VariantProps } from "@rinzai/zen";

const buttonVariants = cva(
	"inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 truncate",
	{
		variants: {
			variant: {
				primary: "bg-primary text-primary-foreground hover:bg-primary/90",
				secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
				destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
				ghost: "hover:bg-accent hover:text-accent-foreground",
				warning: "bg-warning text-warning-foreground hover:bg-warning/90",
				"outline-primary":
					"border border-primary bg-background text-primary hover:bg-primary hover:text-primary-foreground",
				"outline-secondary":
					"border border-secondary-foreground bg-background text-secondary-foreground hover:bg-secondary",
				"outline-destructive":
					"border border-destructive bg-background text-destructive hover:bg-destructive hover:text-destructive-foreground",
				"outline-ghost": "border border-transparent bg-background hover:bg-accent hover:text-accent-foreground",
				"outline-warning":
					"border border-warning bg-background text-warning hover:bg-warning hover:text-warning-foreground",
			},
			size: {
				xs: "h-7 rounded-md px-2 text-xs",
				sm: "h-8 rounded-md px-3 text-xs",
				md: "h-10 px-4 py-2",
				lg: "h-11 rounded-md px-8",
				xl: "h-12 rounded-md px-10",
				"icon-xs": "h-7 w-7",
				"icon-sm": "h-8 w-8",
				"icon-md": "h-10 w-10",
				"icon-lg": "h-12 w-12",
			},
		},
		defaultVariants: {
			variant: "primary",
			size: "md",
		},
	},
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {}

const Button = ({ className, variant, size, ...props }: ButtonProps) => {
	return <button className={cx(buttonVariants({ variant, size, className }))} {...props} />;
	};

export default Button 
