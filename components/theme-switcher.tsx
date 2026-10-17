import Menu from "@feb/menu";
import Pill from "@feb/pill";
import { cx } from "@rinzai/zen";
import { FiMonitor, FiMoon, FiSun } from "react-icons/fi";
import { useEffect, useState } from "react";

type Color = "light" | "dark" | "system";

export interface ThemeSwitcherProps {
	variant?: "dropdown" | "toggle";
	showLabel?: boolean;
}

const colorModeIcon = { light: FiSun, dark: FiMoon, system: FiMonitor };
const colorModeLabel = { light: "Light", dark: "Dark", system: "System" };
const localStorageString = "theme";

const isDarkColorMode = (colorMode: Color) =>
	colorMode === "dark" ||
	(colorMode === "system" &&
		typeof window !== "undefined" &&
		window.matchMedia("(prefers-color-scheme: dark)").matches);

const getStoredColorMode = (): Color => {
	if (typeof window === "undefined") {
		return "system";
	}

	const storedColorMode = window.localStorage.getItem(localStorageString);
	return storedColorMode === "light" || storedColorMode === "dark" || storedColorMode === "system"
		? storedColorMode
		: "system";
};

const getNextColorMode = (colorMode: Color): Color =>
	colorMode === "system" ? "light" : colorMode === "light" ? "dark" : "system";

export default function ThemeSwitcher({ variant = "dropdown", showLabel = false }: ThemeSwitcherProps) {
	const [colorMode, setColorMode] = useState<Color>(getStoredColorMode);

	useEffect(() => {
		if (typeof window === "undefined") {
			return;
		}

		document.documentElement.classList.toggle("dark", isDarkColorMode(colorMode));
		window.localStorage.setItem(localStorageString, colorMode);
	}, [colorMode]);

	const toggleColorMode = () => {
		setColorMode(getNextColorMode(colorMode));
	};

	if (variant === "toggle") {
		const ColorModeIcon = colorModeIcon[colorMode];
		const nextColorMode = getNextColorMode(colorMode);

		return (
			<div className="arc-theme-switcher">
				<Pill
					active={isDarkColorMode(colorMode)}
					aria-label={`Switch to ${nextColorMode} theme`}
					title={`Switch to ${nextColorMode} theme`}
					onClick={toggleColorMode}
					className="w-fit gap-3"
				>
					<ColorModeIcon aria-hidden="true" />
					{showLabel && colorModeLabel[colorMode]}
				</Pill>
			</div>
		);
	}

	const ColorModeIcon = colorModeIcon[colorMode];

	return (
		<div className="arc-theme-switcher">
			<Menu
				className="gap-3"
				contentClassName="min-w-(--anchor-width)"
				buttonText={
					<>
						<ColorModeIcon aria-hidden="true" />
						{showLabel && colorModeLabel[colorMode]}
					</>
				}
			>
				<Menu.Item asChild className={cx("border-0! focus-visible:outline-none", showLabel ? "px-3!" : "justify-center! p-0!")}>
					<Pill
						active={colorMode === "system"}
						title="System Theme"
						onClick={() => {
							setColorMode("system");
						}}
						className={cx(
							"flex w-full gap-3 whitespace-nowrap rounded-t-md rounded-b-none p-2",
							showLabel ? "justify-start" : "justify-center",
						)}
					>
						<FiMonitor className="size-4" aria-hidden="true" />
						{showLabel && colorModeLabel.system}
					</Pill>
				</Menu.Item>
				<Menu.Item asChild className={cx("border-0! focus-visible:outline-none", showLabel ? "px-3!" : "justify-center! p-0!")}>
					<Pill
						active={colorMode === "light"}
						title="Light Theme"
						onClick={() => {
							setColorMode("light");
						}}
						className={cx(
							"flex w-full gap-3 whitespace-nowrap rounded-none p-2",
							showLabel ? "justify-start" : "justify-center",
						)}
					>
						<FiSun className="size-4" aria-hidden="true" />
						{showLabel && colorModeLabel.light}
					</Pill>
				</Menu.Item>
				<Menu.Item asChild className={cx("border-0! focus-visible:outline-none", showLabel ? "px-3!" : "justify-center! p-0!")}>
					<Pill
						active={colorMode === "dark"}
						title="Dark Theme"
						onClick={() => {
							setColorMode("dark");
						}}
						className={cx(
							"flex w-full gap-3 whitespace-nowrap rounded-b-md rounded-t-none p-2",
							showLabel ? "justify-start" : "justify-center",
						)}
					>
						<FiMoon className="size-4" aria-hidden="true" />
						{showLabel && colorModeLabel.dark}
					</Pill>
				</Menu.Item>
			</Menu>
		</div>
	);
}
