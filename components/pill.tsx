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
				"inline-flex w-full items-center justify-center whitespace-nowrap rounded-md p-3 text-xl font-bold text-foreground transition hover:text-primary hover:outline-none hover:ring-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-opacity-75",
				active ? "text-primary!" : "text-muted-foreground",
				className,
			)}
			aria-pressed={active}
			{...props}
		/>
	);
};

export default Pill;
