import { useEffect, useState } from "react";
import { cva, cx } from "@rinzai/zen";

const defaultSymbols = [
	"*",
	"+",
	"×",
	"÷",
	"=",
	"~",
	"!",
	"?",
	"@",
	"#",
	"%",
	"&",
	"§",
	"¶",
	"※",
	"◇",
	"◆",
	"○",
	"●",
	"△",
	"▽",
	"□",
	"■",
	"♠",
	"♣",
	"♦",
	"♤",
	"♧",
	"♢",
	"♪",
	"♫",
	"∴",
	"∵",
];

function getCellVariation(index: number, rows: number, columns: number) {
	const value = Math.sin((index + 1) * 12.9898 + rows * 78.233 + columns * 37.719) * 43758.5453;
	return value - Math.floor(value);
}

const gridLoaderShapes = ["circle", "square", "diamond", "star", "heart", "hexagon"] as const;

const gridLoaderCellVariants = cva(
	"arc-grid-loader__cell grid aspect-square w-full place-items-center overflow-hidden text-center leading-none break-all",
	{
		variants: {
			shape: {
				circle: "rounded-full",
				square: "rounded-md",
				diamond: "arc-grid-loader__cell--diamond",
				star: "arc-grid-loader__cell--star",
				heart: "arc-grid-loader__cell--heart",
				hexagon: "arc-grid-loader__cell--hexagon",
			},
		},
		defaultVariants: {
			shape: "circle",
		},
	},
);

export type GridLoaderShape = (typeof gridLoaderShapes)[number] | "mixed";
export type GridLoaderCellShape = Exclude<GridLoaderShape, "mixed">;

export interface GridLoaderProps extends React.ComponentPropsWithoutRef<"span"> {
	rows?: number;
	columns?: number;
	size?: number;
	maxSize?: number;
	shape?: GridLoaderShape;
	shapes?: readonly GridLoaderCellShape[];
	colors?: string[];
	label?: string;
	symbols?: string[];
}

const GridLoader = ({
	className,
	rows = 3,
	columns = 3,
	size = 120,
	maxSize = 24,
	shape = "circle",
	shapes = gridLoaderShapes,
	colors = [],
	label = "Loading",
	symbols = defaultSymbols,
	style,
	...props
}: GridLoaderProps) => {
	const [symbolIndexes, setSymbolIndexes] = useState<number[]>([]);
	const [randomShapes, setRandomShapes] = useState<GridLoaderCellShape[]>([]);
	const [colorSteps, setColorSteps] = useState<number[]>([]);
	const availableShapes = shapes.length > 0 ? shapes : gridLoaderShapes;
	const [reducedMotion, setReducedMotion] = useState(
		() => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
	);

	useEffect(() => {
		if (shape !== "mixed") return;

		setRandomShapes(
			Array.from(
				{ length: rows * columns },
				() => availableShapes[Math.floor(Math.random() * availableShapes.length)],
			),
		);
	}, [availableShapes, columns, rows, shape]);

	useEffect(() => {
		const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
		const updatePreference = () => setReducedMotion(mediaQuery.matches);

		updatePreference();
		mediaQuery.addEventListener("change", updatePreference);
		return () => mediaQuery.removeEventListener("change", updatePreference);
	}, []);

	useEffect(() => {
		if (reducedMotion || symbols.length === 0) return;

		setSymbolIndexes(
			Array.from({ length: rows * columns }, () => Math.floor(Math.random() * symbols.length)),
		);
	}, [columns, reducedMotion, rows, symbols]);

	if (!Number.isInteger(rows) || rows < 1) {
		throw new RangeError("GridLoader rows must be a positive integer.");
	}
	if (!Number.isInteger(columns) || columns < 1) {
		throw new RangeError("GridLoader columns must be a positive integer.");
	}
	if (!Number.isFinite(size) || size <= 0) {
		throw new RangeError("GridLoader size must be a positive number.");
	}
	if (!Number.isFinite(maxSize) || maxSize <= 0) {
		throw new RangeError("GridLoader maxSize must be a positive number.");
	}
	return (
		<span
			{...props}
			role="status"
			aria-live="polite"
			aria-label={label}
			className={cx("arc-grid-loader inline-flex shrink-0 items-center justify-center align-middle", className)}
			style={{ width: size, height: size, ...style }}
		>
			<span
				aria-hidden="true"
				className="grid h-full w-full place-items-center"
				style={{
					gap: "8%",
					gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
					gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
				}}
			>
				{Array.from({ length: rows * columns }, (_, index) => (
					<span
						key={index}
						className={cx(
							gridLoaderCellVariants({
								shape:
									shape === "mixed"
										? (randomShapes[index] ??
											availableShapes[
												Math.floor(getCellVariation(index, rows, columns) * availableShapes.length)
											])
										: shape,
							}),
						)}
						onAnimationIteration={() => {
							if (shape === "mixed") {
								setRandomShapes((current) => {
									const next = [...current];
									const currentShape =
										next[index] ??
										availableShapes[
											Math.floor(getCellVariation(index, rows, columns) * availableShapes.length)
										];
									const alternatives = availableShapes.filter((candidate) => candidate !== currentShape);
									if (alternatives.length > 0) {
										next[index] = alternatives[Math.floor(Math.random() * alternatives.length)];
									} else {
										next[index] = currentShape;
									}
									return next;
								});
							}

							if (colors.length > 1) {
								setColorSteps((current) => {
									const next = [...current];
									next[index] = (next[index] ?? 0) + 1;
									return next;
								});
							}

							if (symbols.length > 1) {
								setSymbolIndexes((current) => {
									const next = [...current];
									const currentIndex = next[index] ?? index % symbols.length;
									const offset = 1 + Math.floor(Math.random() * (symbols.length - 1));
									next[index] = (currentIndex + offset) % symbols.length;
									return next;
								});
							}
						}}
						style={{
							animationDelay:
								colors.length > 1
									? `${(index / (rows * columns)) * 1200}ms`
									: `${-getCellVariation(index, rows, columns) * 1200}ms`,
							animationDuration:
								colors.length > 1
									? "1200ms"
									: `${900 + getCellVariation(index, rows, columns) * 600}ms`,
							backgroundColor:
								colors.length > 0
									? colors[(index + (colorSteps[index] ?? 0)) % colors.length]
									: undefined,
							fontSize: `${Math.min(size / Math.max(rows, columns), maxSize) * 0.4}px`,
							maxWidth: maxSize,
							maxHeight: maxSize,
						}}
					>
						{symbols.length > 0 && (
							<span className="grid h-full w-full place-items-center text-center leading-none">
								{symbols[symbolIndexes[index] ?? index % symbols.length]}
							</span>
						)}
					</span>
				))}
			</span>
		</span>
	);
};

export default GridLoader;
