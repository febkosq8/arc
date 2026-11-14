import { Combobox } from "@base-ui/react/combobox";
import { cx } from "@rinzai/zen";
import { FaCheck, FaChevronDown } from "react-icons/fa6";
import type { KeyboardEventHandler, ReactNode } from "react";
import { useRef } from "react";

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
	id?: string;
	inputValue?: string;
	onInputValueChange?: (inputValue: string) => void;
	onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
	renderItem?: (item: DropdownItem) => ReactNode;
	renderValue?: (item: DropdownItem) => ReactNode;
	selectedValueFillsSpace?: boolean;
	loading?: boolean;
	loadingLabel?: string;
	"aria-label"?: string;
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
	id,
	inputValue,
	onInputValueChange,
	onKeyDown,
	open,
	onOpenChange,
	renderItem,
	renderValue,
	selectedValueFillsSpace = false,
	loading = false,
	loadingLabel = "Loading options…",
	"aria-label": ariaLabel,
	"data-name": dataName,
	"data-required": dataRequired,
}: DropdownProps) => {
	const selectedItem = items.find((item) => String(item.key) === String(value)) ?? null;
	const selectedValue = selectedItem && renderValue ? renderValue(selectedItem) : null;
	const hasSelectedValue = selectedValue !== null && selectedValue !== undefined && selectedValue !== false;
	const inputRef = useRef<HTMLInputElement>(null);

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
			open={open}
			onOpenChange={(isOpen) => onOpenChange?.(isOpen)}
			inputValue={inputValue}
			onInputValueChange={(newInputValue) => onInputValueChange?.(newInputValue)}
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
						hasSelectedValue && (selectedValueFillsSpace ? "gap-0" : "gap-2"),
						"focus-within:border-transparent focus-within:outline-hidden focus-within:ring-2 focus-within:ring-ring",
						"data-disabled:cursor-not-allowed data-disabled:bg-muted data-disabled:text-muted-foreground",
					)}
				>
					{hasSelectedValue && (
						<span
							className={cx(
								"ml-3",
								selectedValueFillsSpace ? "mr-2 min-w-0 flex-1 truncate" : "flex shrink-0 items-center",
							)}
							onMouseDown={
								selectedValueFillsSpace
									? (event) => {
											event.preventDefault();
											inputRef.current?.focus();
										}
									: undefined
							}
						>
							{selectedValue}
						</span>
					)}
					<Combobox.Input
						ref={inputRef}
						id={id}
						className={cx(
							"h-full min-w-0 border-none bg-transparent outline-hidden placeholder:text-muted-foreground focus:ring-0 focus:outline-hidden disabled:cursor-not-allowed",
							hasSelectedValue ? (selectedValueFillsSpace ? "w-0 flex-none p-0" : "grow py-2 pl-0") : "grow py-2 pl-3",
						)}
						placeholder={placeholder}
						onKeyDown={onKeyDown}
						aria-label={ariaLabel}
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
							{loading && (
								<div role="status" className="px-4 py-2 text-sm text-muted-foreground">
									{loadingLabel}
								</div>
							)}
							<Combobox.Empty
								className={cx(
									"relative cursor-default select-none px-4 py-2 text-muted-foreground empty:hidden",
									loading && "hidden",
								)}
							>
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
										{renderItem ? (
											renderItem(item)
										) : (
											<span title={item.label} className="block truncate">
												{item.label}
											</span>
										)}
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
