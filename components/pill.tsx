import { cx } from "@rinzai/zen";

export interface PillProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	active?: boolean;
}

const Pill = ({ active = false, className, ...props }: PillProps) => {
	return (
		<button
			type="button"
			className={cx(
				"arc-pill",
				"inline-flex h-10 w-full items-center justify-center whitespace-nowrap rounded-md border border-transparent px-3 py-2 text-base font-medium text-foreground transition hover:text-primary hover:outline-none hover:ring-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-opacity-75",
				active ? "text-primary!" : "text-muted-foreground",
				className,
			)}
			aria-pressed={active}
			{...props}
		/>
	);
};

export default Pill;
