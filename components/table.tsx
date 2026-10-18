import { cx } from "@rinzai/zen";
import { rankItem } from "@tanstack/match-sorter-utils";
import {
	ColumnFiltersState,
	ColumnVisibilityState,
	OnChangeFn,
	SortingState,
	columnFilteringFeature,
	columnResizingFeature,
	columnSizingFeature,
	columnVisibilityFeature,
	createColumnHelper,
	createFilteredRowModel,
	createPaginatedRowModel,
	createSortedRowModel,
	filterFn_includesString,
	globalFilteringFeature,
	rowPaginationFeature,
	rowSortingFeature,
	sortFn_alphanumeric,
	sortFn_alphanumericCaseSensitive,
	sortFn_basic,
	sortFn_datetime,
	sortFn_text,
	sortFn_textCaseSensitive,
	tableFeatures,
	useTable,
} from "@tanstack/react-table";
import { useEffect, useId, useMemo, useState } from "react";
import Button from "./button";
import Input from "./input";
import PreviewCard from "./preview-card";
import Select from "./select";
import {
	FaAnglesLeft,
	FaAnglesRight,
	FaArrowDownWideShort,
	FaArrowUpWideShort,
	FaArrowsUpDown,
	FaChevronLeft,
	FaChevronRight,
	FaEye,
	FaEyeSlash,
	FaFilterCircleXmark,
	FaLock,
	FaTableColumns,
} from "react-icons/fa6";

const fuzzyFilter = (row: any, columnId: any, value: any, addMeta: any) => {
	let rowValue = row.getValue(columnId);
	const itemRank = rankItem(rowValue, value);
	addMeta({
		itemRank,
	});
	return itemRank.passed;
};

const selectFilter = (row: any, columnId: any, filterValue: any) => {
	const rowValue = row.getValue(columnId);
	if (Array.isArray(rowValue)) {
		return rowValue.some((v: any) => String(v) === String(filterValue));
	}
	if (typeof rowValue === "string" && rowValue.includes(",")) {
		return rowValue
			.split(",")
			.map((v: string) => v.trim())
			.includes(String(filterValue));
	}
	return String(rowValue) === String(filterValue);
};

type TableColumnMeta = {
	headerLabel?: string;
	filterSelectOptions?: { value: string; label: string }[];
	mobileFullWidth?: boolean;
};

export type TableColumnDef = {
	accessorKey: string;
	header: string;
	id?: string;
	enableResizing?: boolean;
	enableColumnFilter?: boolean;
	enableSorting?: boolean;
	enableHiding?: boolean;
	size?: number;
	minSize?: number;
	maxSize?: number;
	filterFn?: "auto" | "fuzzy" | "includesString" | "select" | ((...args: any[]) => boolean);
	filterSelectOptions?: { value: string; label: string }[];
	mobileFullWidth?: boolean;
	cell?: any;
};

export type TableProps = {
	data: any[];
	columnDef: TableColumnDef[];
	pageSize?: number;
	className?: string;
	showHeader?: boolean;
	showFilters?: boolean;
	showSorting?: boolean;
};

const features = tableFeatures({
	columnMeta: {} as TableColumnMeta,
	columnFilteringFeature,
	columnResizingFeature,
	columnSizingFeature,
	columnVisibilityFeature,
	globalFilteringFeature,
	rowPaginationFeature,
	rowSortingFeature,
	filteredRowModel: createFilteredRowModel(),
	paginatedRowModel: createPaginatedRowModel(),
	sortedRowModel: createSortedRowModel(),
	sortFns: {
		alphanumeric: sortFn_alphanumeric,
		alphanumericCaseSensitive: sortFn_alphanumericCaseSensitive,
		basic: sortFn_basic,
		datetime: sortFn_datetime,
		text: sortFn_text,
		textCaseSensitive: sortFn_textCaseSensitive,
	},
	filterFns: {
		fuzzy: fuzzyFilter,
		includesString: filterFn_includesString,
		select: selectFilter,
	},
});

const columnHelper = createColumnHelper<typeof features, any>();

const Table = ({
	data,
	columnDef,
	pageSize = 10,
	className,
	showHeader = true,
	showFilters = true,
	showSorting = true,
}: TableProps) => {
	const tableId = useId();
	const [pagination, setPagination] = useState({ pageIndex: 0, pageSize });
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [globalFilter, setGlobalFilter] = useState("");
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnVisibility, setColumnVisibility] = useState<ColumnVisibilityState>({});
	const hasActiveFilters = columnFilters.length > 0 || globalFilter !== "";

	const columns = useMemo(() => {
		return columnDef?.map((item) => {
			return columnHelper.accessor(item.accessorKey, {
				id: item.id,
				enableResizing: item.enableResizing,
				enableColumnFilter: item.enableColumnFilter,
				enableSorting: item.enableSorting,
				enableHiding: item.enableHiding ?? true,
				size: item.size,
				minSize: item.minSize ?? 50,
				maxSize: item.maxSize ?? 1000,
				filterFn: item.filterFn ?? (item.filterSelectOptions ? "select" : undefined),
				meta: {
					headerLabel: item.header,
					filterSelectOptions: item.filterSelectOptions,
					mobileFullWidth: item.mobileFullWidth,
				},
				header: (header) => {
					const isSorted = header.column.getIsSorted();
					const canSort = header.column.getCanSort();
					return (
						<div className="flex flex-col gap-1.5">
							<div
								className={cx("flex items-center gap-1.5", showSorting && canSort && "cursor-pointer select-none")}
								onClick={showSorting && canSort ? header.column.getToggleSortingHandler() : undefined}
							>
								<span className="min-w-0 truncate text-sm font-semibold tracking-wide">{item.header}</span>
								{showSorting && canSort && (
									<span className="text-muted-foreground ml-auto shrink-0 text-xs">
										{isSorted === "asc" && <FaArrowUpWideShort className="text-primary h-3.5 w-3.5" />}
										{isSorted === "desc" && <FaArrowDownWideShort className="text-primary h-3.5 w-3.5" />}
										{isSorted === false && <FaArrowsUpDown className="h-3 w-3 opacity-60" />}
									</span>
								)}
							</div>
						</div>
					);
				},
				cell: item.cell,
			});
		});
	}, [columnDef]);
	const table = useTable({
		data,
		columns,
		state: {
			columnFilters,
			globalFilter,
			sorting,
			pagination,
			columnVisibility,
		},
		enableColumnResizing: true,
		columnResizeMode: "onChange",
		onColumnVisibilityChange: setColumnVisibility,
		onSortingChange: setSorting as OnChangeFn<SortingState>,
		onColumnFiltersChange: setColumnFilters as OnChangeFn<ColumnFiltersState>,
		onGlobalFilterChange: setGlobalFilter,
		globalFilterFn: fuzzyFilter,
		features,
		defaultColumn: {
			size: 200,
			minSize: 50,
			maxSize: 1000,
		},
	});

	const totalRows = table.getFilteredRowModel().rows.length;
	const visibleColumns = table.getVisibleLeafColumns();
	const hasFilterControls = showFilters && visibleColumns.some((column) => column.getCanFilter());
	const hasSortingControls = showSorting && visibleColumns.some((column) => column.getCanSort());
	const getColumnLabel = (columnId: string) =>
		columnDef.find((item) => (item.id ?? item.accessorKey) === columnId)?.header ?? columnId;

	return (
		<div className={cx("flex w-full min-w-0 flex-col", className)}>
			{showHeader && (
				<div className="border-muted-foreground bg-card relative z-10 flex flex-col gap-3 rounded-t-lg border p-3 md:flex-row md:items-center md:gap-4">
					<div className="flex items-center gap-2">
						<Button
							variant="outline-secondary"
							size="sm"
							disabled={!hasActiveFilters && sorting.length === 0}
							onClick={() => {
								setColumnFilters([]);
								setGlobalFilter("");
								setSorting([]);
							}}
							title="Clear filters and sorting"
							type="button"
						>
							<FaFilterCircleXmark className="mr-1.5 h-3 w-3" />
							Clear filters and sorting
						</Button>
						<ColumnToggle table={table} />
					</div>
					<nav
						aria-label="Table pagination"
						className="flex w-full items-center justify-between gap-1 md:flex-1 md:justify-center"
					>
						<div className="flex items-center gap-1">
							<Button
								variant="outline-secondary"
								size="icon-md"
								className="h-10 w-10 sm:h-8 sm:w-8"
								onClick={() => setPagination((curr) => ({ ...curr, pageIndex: 0 }))}
								disabled={!table.getCanPreviousPage()}
								title="First page"
								aria-label="First page"
								type="button"
							>
								<FaAnglesLeft aria-hidden="true" className="h-3.5 w-3.5" />
							</Button>
							<Button
								variant="outline-secondary"
								size="icon-md"
								className="h-10 w-10 sm:h-8 sm:w-8"
								onClick={() => setPagination((curr) => ({ ...curr, pageIndex: curr.pageIndex - 1 }))}
								disabled={!table.getCanPreviousPage()}
								title="Previous page"
								aria-label="Previous page"
								type="button"
							>
								<FaChevronLeft aria-hidden="true" className="h-3.5 w-3.5" />
							</Button>
						</div>
						<span className="text-center text-xs font-medium">
							<span className="text-foreground">
								{totalRows > 0 ? `${totalRows} ${totalRows === 1 ? "row" : "rows"}` : "No rows"}
							</span>
							{totalRows > 0 && (
								<span className="text-muted-foreground block">
									Page {table.state.pagination.pageIndex + 1} of {table.getPageCount()}
									{hasActiveFilters && " · filtered"}
								</span>
							)}
						</span>
						<div className="flex items-center gap-1">
							<Button
								variant="outline-secondary"
								size="icon-md"
								className="h-10 w-10 sm:h-8 sm:w-8"
								onClick={() => setPagination((curr) => ({ ...curr, pageIndex: curr.pageIndex + 1 }))}
								disabled={!table.getCanNextPage()}
								title="Next page"
								aria-label="Next page"
								type="button"
							>
								<FaChevronRight aria-hidden="true" className="h-3.5 w-3.5" />
							</Button>
							<Button
								variant="outline-secondary"
								size="icon-md"
								className="h-10 w-10 sm:h-8 sm:w-8"
								onClick={() => setPagination((curr) => ({ ...curr, pageIndex: table.getPageCount() - 1 }))}
								disabled={!table.getCanNextPage()}
								title="Last page"
								aria-label="Last page"
								type="button"
							>
								<FaAnglesRight aria-hidden="true" className="h-3.5 w-3.5" />
							</Button>
						</div>
					</nav>
					<label
						htmlFor={`${tableId}-page-size`}
						className="text-muted-foreground flex w-full items-center justify-between gap-2 text-xs md:w-auto"
					>
						Rows per page
						<Select
							id={`${tableId}-page-size`}
							value={table.state.pagination.pageSize.toString()}
							onChange={(value) => {
								setPagination({ ...pagination, pageSize: Number(value) });
							}}
							className="w-16"
							data={[10, 20, 30, 40, 50].map((i) => ({ key: i.toString(), label: i.toString() }))}
						/>
					</label>
				</div>
			)}
			{(hasFilterControls || hasSortingControls) && (
				<details className="border-muted-foreground border-x border-b px-3 py-2">
					<summary className="cursor-pointer text-sm font-medium">
						{hasFilterControls && hasSortingControls
							? "Filters and sorting"
							: hasFilterControls
								? "Filters"
								: "Sorting"}
					</summary>
					<div className="grid gap-3 pt-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
						{hasSortingControls && (
							<div className="flex min-w-0 items-end gap-2">
								<div className="min-w-0 flex-1">
									<label
										htmlFor={`${tableId}-sort`}
										className="text-muted-foreground mb-1 block text-xs font-medium"
									>
										Sort by
									</label>
									<Select
										id={`${tableId}-sort`}
										value={sorting[0]?.id ?? "__none__"}
										onChange={(columnId) => {
											setSorting((current) => {
												if (columnId === "__none__") return [];
												const currentSort = current.find((item) => item.id === columnId);
												return [{ id: columnId, desc: currentSort?.desc ?? false }];
											});
										}}
										data={[
											{ key: "__none__", label: "No sorting" },
											...table
												.getVisibleLeafColumns()
												.filter((column: any) => column.getCanSort())
												.map((column: any) => ({
													key: column.id,
													label: column.columnDef.meta?.headerLabel ?? column.id,
												})),
										]}
									/>
								</div>
								<Button
									variant="outline-secondary"
									size="icon-sm"
									disabled={sorting.length === 0}
									title={sorting[0]?.desc ? "Sort ascending" : "Sort descending"}
									aria-label={sorting[0]?.desc ? "Sort ascending" : "Sort descending"}
									onClick={() =>
										setSorting((current) =>
											current.map((item, index) => (index === 0 ? { ...item, desc: !item.desc } : item)),
										)
									}
									type="button"
								>
									{sorting[0]?.desc ? (
										<FaArrowDownWideShort aria-hidden="true" className="h-3.5 w-3.5" />
									) : (
										<FaArrowUpWideShort aria-hidden="true" className="h-3.5 w-3.5" />
									)}
								</Button>
							</div>
						)}
						{hasFilterControls &&
							visibleColumns
								.filter((column: any) => column.getCanFilter())
								.map((column: any) => {
									const label = column.columnDef.meta?.headerLabel ?? column.id;
									const filterId = `${tableId}-${column.id}-filter`;
									return (
										<div key={column.id} className="min-w-0">
											<label htmlFor={filterId} className="text-muted-foreground mb-1 block text-xs font-medium">
												{label}
											</label>
											<Filter column={column} idPrefix={`${tableId}-`} />
										</div>
									);
								})}
					</div>
				</details>
			)}
			<div
				className={cx(
					"border-muted-foreground w-full min-w-0 overflow-hidden border-x border-b last:rounded-b-lg",
					!showHeader && "rounded-t-lg border-t",
				)}
			>
				<div className="hidden w-full min-w-0 overflow-x-auto md:block">
					<table
						className="w-full table-fixed border-collapse"
						style={{
							minWidth: table.getVisibleLeafColumns().reduce((total, column) => total + column.getSize(), 0),
						}}
					>
						<thead>
							{table.getHeaderGroups().map((headerGroup) => (
								<tr key={headerGroup.id} className="bg-muted/50">
									{headerGroup.headers.map((header) => (
										<th
											className="border-border relative border-r border-b px-3 py-2.5 text-left last:border-r-0"
											key={header.id}
											style={{ width: header.getSize() }}
											colSpan={header.colSpan}
										>
											{header.isPlaceholder ? null : <table.FlexRender header={header} />}
											<div
												onDoubleClick={() => header.column.resetSize()}
												onMouseDown={header.getResizeHandler()}
												onTouchStart={header.getResizeHandler()}
												className={cx(
													"absolute top-0 right-0 h-full w-1 cursor-col-resize",
													"hover:bg-primary/50 active:bg-primary",
													header.column.getIsResizing() && "bg-primary",
												)}
											>
												{header.column.getIsResizing() && (
													<span className="bg-primary text-primary-foreground pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 rounded px-1.5 py-0.5 text-[10px] font-medium whitespace-nowrap shadow">
														{Math.round(header.getSize())}px
													</span>
												)}
											</div>
										</th>
									))}
								</tr>
							))}
						</thead>
						<tbody>
							{table.getRowModel().rows.length === 0 && (
								<tr>
									<td colSpan={columns.length} className="text-muted-foreground px-3 py-4 text-center text-sm">
										No results found.
									</td>
								</tr>
							)}
							{table.getRowModel().rows.map((row, i) => (
								<tr
									key={row.id}
									className={cx(
										"h-8 transition-colors",
										"hover:bg-accent/50",
										i % 2 === 1 && "bg-muted/20",
										i < table.getRowModel().rows.length - 1 && "border-border border-b",
									)}
								>
									{row.getVisibleCells().map((cell) => (
										<td key={cell.id} className="border-border max-w-0 truncate border-r px-2 text-sm last:border-r-0">
											<table.FlexRender cell={cell} />
										</td>
									))}
								</tr>
							))}
						</tbody>
					</table>
				</div>
				<div className="flex flex-col gap-3 p-3 md:hidden">
					{table.getRowModel().rows.length === 0 ? (
						<div className="text-muted-foreground px-3 py-4 text-center text-sm">No results found.</div>
					) : (
						table.getRowModel().rows.map((row, rowIndex) => (
							<article
								key={row.id}
								className={cx(
									"border-border bg-background min-w-0 rounded-md border p-4",
									rowIndex % 2 === 1 && "bg-muted/20",
								)}
							>
								<dl className="flex min-w-0 flex-col gap-2">
									{row.getVisibleCells().map((cell, cellIndex) => (
										<div
											key={cell.id}
											className={cx(
												"border-border min-w-0 border-b pb-2 last:border-b-0 last:pb-0",
												cellIndex === 0 || cell.column.columnDef.meta?.mobileFullWidth
													? "flex flex-col gap-1"
													: "grid grid-cols-[minmax(5rem,1fr)_minmax(0,2fr)] items-start gap-2",
											)}
										>
											<dt className="text-muted-foreground shrink-0 text-xs font-medium">
												{getColumnLabel(cell.column.id)}
											</dt>
											<dd
												className={cx(
													"max-w-full min-w-0 overflow-hidden text-sm break-all *:max-w-full",
													cellIndex === 0 && "font-medium",
													cell.column.columnDef.meta?.mobileFullWidth && "w-full",
												)}
											>
												<table.FlexRender cell={cell} />
											</dd>
										</div>
									))}
								</dl>
							</article>
						))
					)}
				</div>
			</div>
		</div>
	);
};
type DebouncedInputProps = {
	value: string;
	onChange: (value: string) => void;
	debounce?: number;
	[x: string]: any;
};

function DebouncedInput({ value: initialValue, onChange, debounce = 500, ...props }: DebouncedInputProps) {
	const [value, setValue] = useState(initialValue);

	useEffect(() => {
		setValue(initialValue);
	}, [initialValue]);

	useEffect(() => {
		const timeout = setTimeout(() => {
			onChange(value);
		}, debounce);

		return () => clearTimeout(timeout);
	}, [value, debounce, onChange]);

	return <Input {...props} value={value} onChange={(e) => setValue(e.target.value)} autoComplete="off" />;
}
function Filter({ column, idPrefix = "" }: { column: any; idPrefix?: string }) {
	const filterId = `${idPrefix}${column.id}-filter`;
	const filterMap: { [key: string]: string } = {
		includesString: "Includes string",
		equalsString: "Equals string",
		arrIncludes: "Included in list",
		equals: "Equals",
		fuzzy: "Fuzzy",
	};
	const columnFilterValue = column.getFilterValue();
	const filterSelectOptions = column.columnDef.meta?.filterSelectOptions as
		{ value: string; label: string }[] | undefined;

	if (filterSelectOptions) {
		return (
			<Select
				id={filterId}
				value={columnFilterValue ?? "__all__"}
				onChange={(value) => column.setFilterValue(value === "__all__" ? undefined : value)}
				className="w-full text-xs"
				data={[
					{ key: "__all__", label: "All" },
					...filterSelectOptions.map((opt) => ({ key: opt.value, label: opt.label })),
				]}
			/>
		);
	}

	return (
		<DebouncedInput
			id={filterId}
			type="text"
			name={column.id}
			value={columnFilterValue ?? ""}
			onChange={(value) => column.setFilterValue(value)}
			title={`Search (${filterMap[column.columnDef.filterFn]})`}
			placeholder={`Filter...`}
			className="border-border text-foreground placeholder:text-muted-foreground focus:ring-ring w-full rounded border bg-transparent px-2 py-1 text-xs shadow-sm focus:border-transparent focus:ring-1 focus:outline-hidden"
		/>
	);
}
function ColumnToggle({ table }: { table: any }) {
	return (
		<PreviewCard
			trigger="click"
			triggerRender={<Button variant="outline-secondary" size="sm" title="Toggle columns" type="button" />}
			side="bottom"
			align="start"
			className="p-1"
			cardContent={
				<div className="flex flex-col">
					{table.getAllLeafColumns().map((column: any) => {
						const label = column.columnDef.meta?.headerLabel ?? column.id;
						const canHide = column.getCanHide();
						const isVisible = column.getIsVisible();
						return (
							<Button
								key={column.id}
								variant="ghost"
								size="sm"
								disabled={!canHide}
								className={cx(
									"border-border flex w-full items-center justify-start gap-2 rounded-none border-x-0 border-t-0 text-xs shadow-none last:border-b-0",
									!canHide && "cursor-not-allowed opacity-50",
								)}
								onClick={() => canHide && column.toggleVisibility(!isVisible)}
								type="button"
							>
								{!canHide ? (
									<FaLock className="h-3 w-3" />
								) : isVisible ? (
									<FaEye className="text-primary h-3 w-3" />
								) : (
									<FaEyeSlash className="text-muted-foreground h-3 w-3" />
								)}
								{label}
							</Button>
						);
					})}
				</div>
			}
		>
			<FaTableColumns className="mr-1.5 h-3 w-3" />
			Columns
		</PreviewCard>
	);
}
export default Table;
