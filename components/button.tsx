import { cva, cx } from "@rinzai/zen";
import ButtonGroup from "./button-group";

type VariantClassProps = { class?: never; className?: never } | { class?: never; className: string | undefined };

type ButtonVariantOptions = VariantClassProps & {
	variant?:
		| "primary"
		| "secondary"
		| "destructive"
		| "ghost"
		| "warning"
		| "outline-primary"
		| "outline-secondary"
		| "outline-destructive"
		| "outline-ghost"
		| "outline-warning"
		| null;
	size?: "xs" | "sm" | "md" | "lg" | "xl" | "icon-xs" | "icon-sm" | "icon-md" | "icon-lg" | "icon-xl" | null;
};

const buttonVariants: (props?: ButtonVariantOptions) => string = cva(
	"inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 truncate",
	{
		variants: {
			variant: {
				primary: "bg-primary text-primary-foreground hover:bg-primary/90",
				secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
				destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
				ghost: "text-foreground hover:bg-accent hover:text-accent-foreground [&>svg]:text-inherit",
				warning: "bg-warning text-warning-foreground hover:bg-warning/90",
				"outline-primary":
					"border border-primary bg-background text-primary hover:bg-primary hover:text-primary-foreground",
				"outline-secondary":
					"border border-secondary-foreground bg-background text-secondary-foreground hover:bg-secondary",
				"outline-destructive":
					"border border-destructive bg-background text-destructive hover:bg-destructive hover:text-destructive-foreground",
				"outline-ghost":
					"border border-transparent bg-background text-foreground hover:bg-accent hover:text-accent-foreground [&>svg]:text-inherit",
				"outline-warning":
					"border border-warning bg-background text-warning hover:bg-warning hover:text-warning-foreground",
			},
			size: {
				xs: "h-7 rounded-md px-2 text-xs",
				sm: "h-8 pointer-coarse:min-h-10 rounded-md px-3 text-xs",
				md: "h-10 pointer-coarse:min-h-11 px-4 py-2",
				lg: "h-11 rounded-md px-8",
				xl: "h-12 rounded-md px-10",
				"icon-xs": "h-7 w-7",
				"icon-sm": "h-8 w-8",
				"icon-md": "h-10 w-10 pointer-coarse:min-h-11 pointer-coarse:min-w-11",
				"icon-lg": "h-12 w-12",
				"icon-xl": "h-14 w-14",
			},
		},
		defaultVariants: {
			variant: "primary",
			size: "md",
		},
	},
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariantOptions["variant"];
	size?: ButtonVariantOptions["size"];
}

interface ButtonComponent extends React.FC<ButtonProps> {
	Group: typeof ButtonGroup;
}

const Button: ButtonComponent = Object.assign(
	({ className, variant, size, ...props }: ButtonProps) => {
		return <button className={cx("arc-button", buttonVariants({ variant, size, className }))} {...props} />;
	},
	{ Group: ButtonGroup },
);

export default Button;
