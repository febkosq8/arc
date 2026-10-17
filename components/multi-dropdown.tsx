import { Combobox } from "@base-ui/react/combobox";
import { cx } from "@rinzai/zen";
import { FaCheck, FaChevronDown } from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx";
import type { DropdownItem } from "./dropdown";

export interface MultiDropdownProps {
	id?: string;
	items: DropdownItem[];
	value: string[];
	onChange?: (items: DropdownItem[]) => void;
	className?: string;
	placeholder?: string;
	disabled?: boolean;
	name?: string;
	preventEmpty?: boolean;
	"data-name"?: string;
	"data-required"?: boolean;
}

const MultiDropdown = ({
	id,
	items,
	value,
	onChange,
	className,
	placeholder = "Select options",
	disabled,
	name,
	preventEmpty = false,
	"data-name": dataName,
	"data-required": dataRequired,
}: MultiDropdownProps) => {
	const selectedItems = items.filter((item) => value?.includes(String(item.key)));

	return (
		<Combobox.Root
			multiple
			items={items}
			value={selectedItems}
			onValueChange={(newValues) => {
				if (preventEmpty && newValues.length === 0) return;
				onChange?.(newValues);
			}}
			itemToStringLabel={(item) => item?.label ?? ""}
			itemToStringValue={(item) => String(item?.key ?? "")}
			isItemEqualToValue={(a, b) => String(a.key) === String(b.key)}
			name={name}
			disabled={disabled}
		>
			<div className={cx("relative", className)}>
				<Combobox.InputGroup
					className={cx(
						"relative flex min-h-10 w-full flex-wrap items-center justify-between gap-1.5 rounded-md border border-border bg-background py-1 pr-2 pl-2 text-foreground shadow-xs",
						"focus-within:border-transparent focus-within:outline-hidden focus-within:ring-2 focus-within:ring-ring",
						"data-disabled:cursor-not-allowed data-disabled:bg-muted data-disabled:text-muted-foreground",
					)}
				>
					<Combobox.Value>
						{(selectedValues: DropdownItem[]) => (
							<>
								<Combobox.Chips className="flex flex-wrap gap-1.5">
									{selectedValues.map((item) => (
										<Combobox.Chip
											key={item.key}
											className="inline-flex items-center gap-1 rounded-md border border-border bg-muted px-2 py-0.5 text-sm text-foreground"
										>
											<span className="max-w-32 truncate">{item.label}</span>
											{(preventEmpty ? selectedValues.length > 1 : true) && (
												<Combobox.ChipRemove
													className="ml-0.5 cursor-pointer rounded-md hover:text-destructive focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
													aria-label={`Remove ${item.label}`}
												>
													<RxCross1 className="h-3 w-3" aria-hidden="true" />
												</Combobox.ChipRemove>
											)}
										</Combobox.Chip>
									))}
								</Combobox.Chips>
								<Combobox.Input
									id={id}
									className={cx(
										"h-full min-w-20 grow border-none bg-transparent py-0.5 pl-1 outline-hidden placeholder:text-muted-foreground focus:ring-0 focus:outline-hidden disabled:cursor-not-allowed",
										selectedValues.length > 0 && "placeholder-transparent",
									)}
									placeholder={placeholder}
									data-name={dataName}
									data-required={dataRequired}
									data-disabled={disabled}
								/>
							</>
						)}
					</Combobox.Value>
					<Combobox.Trigger
						className="shrink-0 self-center rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
						aria-label="Toggle options"
					>
						<FaChevronDown className="h-5 w-5 text-foreground" aria-hidden="true" />
					</Combobox.Trigger>
				</Combobox.InputGroup>

				<Combobox.Portal>
					<Combobox.Positioner className="z-50" sideOffset={8}>
						<Combobox.Popup className="max-h-60 min-w-(--anchor-width) overflow-auto rounded-md border border-border bg-popover text-foreground shadow-lg outline-0">
							<Combobox.Empty className="relative cursor-default select-none px-4 py-2 text-muted-foreground empty:hidden">
								No values to show.
							</Combobox.Empty>
							<Combobox.List>
								{(item: DropdownItem) => (
									<Combobox.Item
										key={item.key}
										value={item}
										disabled={item.disabled}
										className={cx(
											"relative flex h-8 w-full cursor-default select-none items-center gap-2 border-b border-border px-4 py-1 last:border-b-0",
											"data-selected:font-medium data-selected:text-primary",
											"data-highlighted:bg-accent data-highlighted:text-primary",
											"data-disabled:cursor-not-allowed data-disabled:opacity-50",
										)}
									>
										<Combobox.ItemIndicator className="flex items-center">
											<FaCheck className="h-3 w-3" aria-hidden="true" />
										</Combobox.ItemIndicator>
										<span title={item.label} className="block truncate">
											{item.label}
										</span>
									</Combobox.Item>
								)}
							</Combobox.List>
						</Combobox.Popup>
					</Combobox.Positioner>
				</Combobox.Portal>
			</div>
		</Combobox.Root>
	);
};

export default MultiDropdown;
