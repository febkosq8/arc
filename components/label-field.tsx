import { cx } from "@rinzai/zen";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { RiInfoCardLine } from "react-icons/ri";
import ErrorText from "./error-text";
import PreviewCard from "./preview-card";

export interface LabelFieldProps extends Omit<ComponentPropsWithoutRef<"div">, "children" | "id"> {
	id: string;
	label: string;
	help?: ReactNode;
	errors?: unknown[] | string | null;
}

const LabelField = ({ id, label, help, errors, className, ...props }: LabelFieldProps) => {
	const formattedErrors = Array.isArray(errors)
		? errors.map((error) => (error == null ? "" : String(error)))
		: typeof errors === "string"
			? errors
			: null;

	return (
		<div {...props} className={cx("flex h-7 w-full items-center justify-start gap-2 overflow-hidden", className)}>
			<label className="w-fit text-xl leading-none font-bold whitespace-nowrap" title={label} htmlFor={id}>
				{label}
			</label>
			{help != null && help !== false && (
				<PreviewCard
					trigger="hover"
					triggerRender={
						<button
							type="button"
							aria-label={`Help for ${label}`}
							className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded text-muted-foreground transition hover:bg-accent hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-opacity-75"
						/>
					}
					cardContent={<div className="max-w-100 wrap-break-word text-sm leading-5">{help}</div>}
				>
					<RiInfoCardLine className="h-4 w-4" aria-hidden="true" />
				</PreviewCard>
			)}
			{formattedErrors &&
				(Array.isArray(formattedErrors) ? (
					formattedErrors.length > 0 && <ErrorText data={formattedErrors} />
				) : (
					<ErrorText data={formattedErrors} />
				))}
		</div>
	);
};

export default LabelField;
