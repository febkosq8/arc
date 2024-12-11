import { cx } from "@rinzai/zen";

interface PillProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	active?: boolean;
}

const Pill = (({ active, className, ...props }:PillProps) => {
	return (
		<button
			className={cx(
				`rounded-md p-3 text-xl   font-bold transition inline-flex w-full items-center justify-center text-foreground hover:bg-accent hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-opacity-75  whitespace-nowrap hover:ring-0 hover:outline-none `,
				active ? "text-primary" : "text-muted-foreground",
				className,
			)}
			{...props}
		/>
	);
});

export default Pill;
