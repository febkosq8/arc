import { cx } from "@rinzai/zen";

const Divider = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
	return <div role="separator" className={cx("arc-divider w-full border-b border-border", className)} {...props} />;
};

export default Divider;
