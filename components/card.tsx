import { cva, cx } from "@rinzai/zen";

export type CardVariant =
	| "primary"
	| "secondary"
	| "destructive"
	| "warning"
	| "outline-primary"
	| "outline-secondary"
	| "outline-destructive"
	| "outline-warning";

type VariantClassProps = { class?: never; className?: never } | { class?: never; className: string | undefined };

type CardVariantOptions = VariantClassProps & { variant?: CardVariant | null };

const cardVariants: (props?: CardVariantOptions) => string = cva(
	"arc-card group relative rounded-lg border border-foreground/40 bg-card/90 p-3 shadow-xs",
	{
		variants: {
			variant: {
				primary: "border-primary bg-primary text-primary-foreground",
				secondary: "border-secondary bg-secondary text-secondary-foreground",
				destructive: "border-destructive bg-destructive text-destructive-foreground",
				warning: "border-warning bg-warning text-warning-foreground",
				"outline-primary": "border-primary bg-background text-primary",
				"outline-secondary": "border-secondary-foreground bg-background text-secondary-foreground",
				"outline-destructive": "border-destructive bg-background text-destructive",
				"outline-warning": "border-warning bg-background text-warning",
			},
		},
		defaultVariants: {
			variant: "outline-secondary",
		},
	},
);

interface CardProps extends React.ComponentPropsWithoutRef<"div"> {
	variant?: CardVariant;
	hoverable?: boolean;
	hoverLift?: boolean;
	hoverBorder?: boolean;
	hoverGradient?: boolean;
	postHeaderBorder?: boolean;
	preFooterBorder?: boolean;
}

const Card = (props: CardProps) => {
	const {
		className,
		variant,
		hoverable = true,
		hoverLift = true,
		hoverBorder = true,
		hoverGradient = true,
		postHeaderBorder = true,
		preFooterBorder = true,
		onPointerMove,
		...rest
	} = props;
	const hasHoverLift = hoverable && hoverLift;
	const hasHoverBorder = hoverable && hoverBorder;
	const hasHoverGradient = hoverable && hoverGradient;
	const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
		onPointerMove?.(event);
		if (!hasHoverGradient) return;

		const bounds = event.currentTarget.getBoundingClientRect();
		event.currentTarget.style.setProperty("--card-pointer-x", `${event.clientX - bounds.left}px`);
		event.currentTarget.style.setProperty("--card-pointer-y", `${event.clientY - bounds.top}px`);
	};

	return (
		<div
			className={cx(
				cardVariants({ variant }),
				hasHoverGradient && "arc-card-cursor-border",
				postHeaderBorder && "[&_.arc-card-header]:border-b",
				!postHeaderBorder && "[&_.arc-card-header]:border-b-0",
				preFooterBorder && "[&_.arc-card-footer]:border-t",
				!preFooterBorder && "[&_.arc-card-footer]:border-t-0",
				(hasHoverLift || hasHoverBorder) && "transition-[border-color,transform] duration-300 ease-out",
				hasHoverLift && "hover:-translate-y-1",
				hasHoverBorder && "hover:border-primary",
				className,
			)}
			onPointerMove={hasHoverGradient ? handlePointerMove : onPointerMove}
			{...rest}
		/>
	);
};

const Header = (props: CardProps) => {
	const { className, ...rest } = props;
	return (
		<h2
			className={cx(
				"arc-card-header flex w-full typography-heading-3 flex-col border-foreground/40 px-0 pb-1",
				className,
			)}
			{...rest}
		/>
	);
};
const Content = (props: CardProps) => {
	const { className, ...rest } = props;
	return (
		<div
			className={cx(
				"arc-card-content typography-paragraph mt-0! w-full justify-between px-0 py-1 whitespace-pre-wrap",
				className,
			)}
			{...rest}
		/>
	);
};
const Footer = (props: CardProps) => {
	const { className, ...rest } = props;
	return (
		<div
			className={cx(
				"arc-card-footer typography-muted mt-auto mb-0 flex w-full items-end justify-start border-foreground/40 px-0 pt-1",
				className,
			)}
			{...rest}
		/>
	);
};
Card.Header = Header;
Card.Content = Content;
Card.Footer = Footer;
export default Card;
