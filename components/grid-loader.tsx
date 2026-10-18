import { useEffect, useState } from "react";
import { cx } from "@rinzai/zen";

const defaultSymbols = [
	"(,,> ᴗ <,,)",
	"≽^•⩊•^≼",
	"(╥﹏╥)",
	"(˶ᵔ ᵕ ᵔ˶)",
	"•⩊•",
	"˚₊‧꒰ა ₍ᐢ.  ̫.ᐢ₎ ໒꒱ ‧₊˚",
	"٩(ˊᗜˋ )و",
	"(≧◡≦)",
	"⸜(｡˃ ᵕ ˂ )⸝♡",
	"(˶˃⤙˂˶)",
	"（˶′◡‵˶）",
	"(＾▽＾)",
	"˚₊‧꒰ა.  .໒꒱ ‧₊˚",
	"( ˶ˆᗜˆ˵ )",
	"⊹ ₊  ⁺‧₊˚ ♡ ପ(๑•ᴗ•๑)ଓ ♡˚₊‧⁺ ₊ ⊹",
	"(つ﹏⊂)",
	"ʕ•̫͡•ʕ•̫͡•ʔ•̫͡•ʔ•̫͡•ʕ•̫͡•ʔ•̫͡ʕ•̫͡•ʕ•̫͡•ʔ•̫͡ʔ•̫͡•",
	"（´・｀ ）♡",
	"(╥_╥)",
	"(♡ˊ͈ ꒳ ˋ͈)",
	"(⸝⸝๑  ̫ ๑⸝⸝⸝)",
	"(˶º⤙º˶)",
	"૮₍｡´ᴖ ˔ ᴖ`｡₎ა",
	"(•̀ᴗ•́)و ̑̑",
	"(─‿‿─)",
];

function getCellVariation(index: number, rows: number, columns: number) {
	const value = Math.sin((index + 1) * 12.9898 + rows * 78.233 + columns * 37.719) * 43758.5453;
	return value - Math.floor(value);
}

export interface GridLoaderProps extends React.ComponentPropsWithoutRef<"span"> {
	rows?: number;
	columns?: number;
	size?: number;
	maxSize?: number;
	label?: string;
	symbols?: string[];
}

const GridLoader = ({
	className,
	rows = 3,
	columns = 3,
	size = 120,
	maxSize = 24,
	label = "Loading",
	symbols = defaultSymbols,
	...props
}: GridLoaderProps) => {
	const [symbolIndexes, setSymbolIndexes] = useState<number[]>([]);
	const [reducedMotion, setReducedMotion] = useState(
		() => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
	);

	useEffect(() => {
		const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
		const updatePreference = () => setReducedMotion(mediaQuery.matches);

		updatePreference();
		mediaQuery.addEventListener("change", updatePreference);
		return () => mediaQuery.removeEventListener("change", updatePreference);
	}, []);

	useEffect(() => {
		if (reducedMotion) return;

		const randomizeSymbols = () => {
			const shuffled = Array.from({ length: symbols.length }, (_, index) => index);
			for (let index = shuffled.length - 1; index > 0; index -= 1) {
				const swapIndex = Math.floor(Math.random() * (index + 1));
				[shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
			}
			setSymbolIndexes(Array.from({ length: rows * columns }, (_, index) => shuffled[index % shuffled.length]));
		};

		randomizeSymbols();
		if (symbols.length < 2) return;

		const timer = window.setInterval(() => {
			randomizeSymbols();
		}, 900);

		return () => window.clearInterval(timer);
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
	if (symbols.length === 0) {
		throw new RangeError("GridLoader symbols must contain at least one item.");
	}

	return (
		<span
			{...props}
			role="status"
			aria-live="polite"
			aria-label={label}
			className={cx("arc-grid-loader inline-flex items-center justify-center", className)}
		>
			<span
				aria-hidden="true"
				className="grid w-full place-items-center"
				style={{
					width: size,
					height: size,
					gap: "8%",
					gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
					gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
				}}
			>
				{Array.from({ length: rows * columns }, (_, index) => (
					<span
					key={index}
					className="arc-grid-loader__cell grid aspect-square w-full place-items-center overflow-hidden rounded-full text-center leading-none break-all"
					style={{
						animationDelay: `${-getCellVariation(index, rows, columns) * 1200}ms`,
						animationDuration: `${900 + getCellVariation(index, rows, columns) * 600}ms`,
						fontSize: `${Math.min(size / Math.max(rows, columns), maxSize) * 0.3}px`,
						maxWidth: maxSize,
						maxHeight: maxSize,
					}}
					>
					{symbols[symbolIndexes[index] ?? index % symbols.length]}
					</span>
				))}
			</span>
		</span>
	);
};

export default GridLoader;
