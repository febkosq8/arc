import { Select as BaseSelect } from "@base-ui/react/select";
import { cx } from "@rinzai/zen";
import { ReactNode } from "react";
import { FaCheck, FaChevronDown } from "react-icons/fa6";

export type SelectItem = { key: string; label: ReactNode; disabled?: boolean };

export interface SelectProps {
	id?: string;
	value: string;
	onChange: (value: string) => void;
	data: SelectItem[];
	className?: string;
	disabled?: boolean;
	placeholder?: string;
	"data-name"?: string;
}

const Select = ({ id, value, onChange, data, className, disabled, placeholder, ...rest }: SelectProps) => {
	return (
		<BaseSelect.Root
			value={value}
			onValueChange={(val) => {
				if (val !== null) onChange(val);
			}}
			disabled={disabled}
			items={data.map((item) => ({ value: item.key, label: typeof item.label === "string" ? item.label : item.key }))}
			{...rest}
		>
			<BaseSelect.Trigger
				id={id}
				className={cx(
					"arc-select flex h-8 w-full items-center gap-2 overflow-hidden rounded border border-border bg-background px-2 py-1 text-foreground shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-ring pointer-coarse:h-9",
					"disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground",
					className,
				)}
			>
				<BaseSelect.Value placeholder={placeholder} className="min-w-0 flex-1 truncate text-left" />
				<BaseSelect.Icon className="shrink-0">
					<FaChevronDown className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
				</BaseSelect.Icon>
			</BaseSelect.Trigger>

			<BaseSelect.Portal>
				<BaseSelect.Positioner
					className="z-50 outline-none"
					sideOffset={8}
					alignItemWithTrigger={false}
					side="bottom"
					align="start"
				>
					<BaseSelect.Popup className="min-w-(--anchor-width) overflow-hidden rounded-md border border-border bg-popover text-foreground shadow-lg outline-none">
						<BaseSelect.List className="max-h-60 overflow-auto outline-none">
							{data.map((item) => (
								<BaseSelect.Item
									key={item.key}
									value={item.key}
									disabled={item.disabled ?? false}
									className={cx(
										"relative flex w-full cursor-default select-none items-center gap-2 px-2 py-1 outline-none",
										"data-highlighted:bg-accent data-highlighted:text-primary",
										"data-selected:font-medium data-selected:text-primary",
										"data-disabled:cursor-not-allowed data-disabled:opacity-50",
									)}
								>
									<BaseSelect.ItemIndicator className="flex items-center">
										<FaCheck className="h-3 w-3" aria-hidden="true" />
									</BaseSelect.ItemIndicator>
									<BaseSelect.ItemText className="block truncate">{item.label}</BaseSelect.ItemText>
								</BaseSelect.Item>
							))}
						</BaseSelect.List>
					</BaseSelect.Popup>
				</BaseSelect.Positioner>
			</BaseSelect.Portal>
		</BaseSelect.Root>
	);
};

export default Select;
