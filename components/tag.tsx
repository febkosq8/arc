import { cx } from "@rinzai/zen";

const Tag = ({ className, ...props }: React.ComponentPropsWithoutRef<"div">) => {
	return (
		<div
			className={cx("w-fit rounded-full bg-muted px-1.5 py-0.5 text-xs font-bold text-primary", className)}
			{...props}
		/>
	);
};

export default Tag;
