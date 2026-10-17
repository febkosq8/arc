import { cx } from "@rinzai/zen";

export interface LinkPillProps extends React.ComponentPropsWithoutRef<"a"> {
	href: string;
	active?: boolean;
}

const LinkPill = ({ active = false, className, ...props }: LinkPillProps) => {
	return (
		<a
			className={cx(
				"arc-link-pill",
				"inline-flex h-10 min-w-fit items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-md border border-transparent px-3 py-2 text-base font-medium transition hover:text-primary hover:outline-none hover:ring-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-opacity-75",
				active ? "text-primary!" : "text-muted-foreground",
				className,
			)}
			aria-current={active ? "page" : undefined}
			{...props}
		/>
	);
};

export default LinkPill;
