import { cx } from "@rinzai/zen";

export interface ErrorTextProps extends Omit<React.ComponentPropsWithoutRef<"em">, "children"> {
	data?: string[] | string | null;
}

const ErrorText = ({ data, className, ...props }: ErrorTextProps) => {
	const formatted = Array.isArray(data) ? data.join(", ") : typeof data === "string" ? data : null;

	return (
		<em
			role="alert"
			className={cx("arc-error-text animate-pulse whitespace-nowrap text-base font-semibold text-destructive", className)}
			title={formatted ?? undefined}
			{...props}
		>
			{formatted}
		</em>
	);
};

export default ErrorText;
