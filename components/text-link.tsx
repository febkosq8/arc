import { cx } from "@rinzai/zen";

export interface TextLinkProps extends Omit<React.ComponentPropsWithoutRef<"a">, "children"> {
	href: string;
	text: string;
}

const TextLink = ({ className, href, text, target = "_blank", rel, ...props }: TextLinkProps) => {
	return (
		<a
			className={cx(
				"arc-text-link rounded-md text-primary underline transition hover:text-primary/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-opacity-75",
				className,
			)}
			href={href}
			target={target}
			rel={rel ?? (target === "_blank" ? "noopener noreferrer" : undefined)}
			{...props}
		>
			{text}
		</a>
	);
};

export default TextLink;
