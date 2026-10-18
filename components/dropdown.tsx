import { Combobox } from "@base-ui/react/combobox";
import { cx } from "@rinzai/zen";
import { FaCheck, FaChevronDown } from "react-icons/fa6";

export type DropdownItem = { key: string | number; label: string; disabled?: boolean };

export interface DropdownProps {
	items: DropdownItem[];
	value: number | string;
	onChange?: (item: DropdownItem | null) => void;
	className?: string;
	placeholder?: string;
	disabled?: boolean;
	name?: string;
	preventEmpty?: boolean;
	"data-name"?: string;
	"data-required"?: boolean;
}

const Dropdown = ({
	items,
	value,
	onChange,
	className,
	placeholder = "Select an option",
	disabled,
	name,
	preventEmpty = false,
	"data-name": dataName,
	"data-required": dataRequired,
}: DropdownProps) => {
	const selectedItem = items.find((item) => String(item.key) === String(value)) ?? null;

	return (
		<Combobox.Root
			items={items}
			value={selectedItem}
			onValueChange={(newValue) => {
				if (preventEmpty && newValue === null) return;
				const isSelectedAgain =
					newValue !== null && selectedItem !== null && String(newValue.key) === String(selectedItem.key);
				onChange?.(!preventEmpty && isSelectedAgain ? null : newValue);
			}}
			itemToStringLabel={(item) => item?.label ?? ""}
			itemToStringValue={(item) => String(item?.key ?? "")}
			isItemEqualToValue={(a, b) => String(a.key) === String(b.key)}
			name={name}
			disabled={disabled}
		>
			<div className={cx("arc-dropdown relative", className)}>
				<Combobox.InputGroup
					className={cx(
						"relative flex h-8 w-full items-center justify-between gap-5 rounded border border-border bg-background pr-2 text-foreground shadow-xs pointer-coarse:h-9",
						"focus-within:border-transparent focus-within:outline-hidden focus-within:ring-2 focus-within:ring-ring",
						"data-disabled:cursor-not-allowed data-disabled:bg-muted data-disabled:text-muted-foreground",
					)}
				>
					<Combobox.Input
						className="h-full grow border-none bg-transparent py-2 pl-3 outline-hidden placeholder:text-muted-foreground focus:ring-0 focus:outline-hidden disabled:cursor-not-allowed"
						placeholder={placeholder}
						data-name={dataName}
						data-required={dataRequired}
						data-disabled={disabled}
					/>
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

export default Dropdown;
