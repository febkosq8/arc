import Menu from "@feb/menu";
import Pill from "@feb/pill";
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
					className="w-fit gap-2 p-2"
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
				className={showLabel ? "gap-2" : undefined}
				buttonText={
					<>
						<ColorModeIcon aria-hidden="true" />
						{showLabel && colorModeLabel[colorMode]}
					</>
				}
			>
				<>
					<Menu.Item className="border-0! p-0! focus-visible:outline-none">
						<Pill
							active={colorMode === "system"}
							title="System Theme"
							onClick={() => {
								setColorMode("system");
							}}
							className="flex w-full justify-start gap-2 whitespace-nowrap rounded-t-md rounded-b-none p-2"
						>
							<FiMonitor className="size-4" aria-hidden="true" />
							{showLabel && colorModeLabel.system}
						</Pill>
					</Menu.Item>
					<Menu.Item className="border-0! p-0! focus-visible:outline-none">
						<Pill
							active={colorMode === "light"}
							title="Light Theme"
							onClick={() => {
								setColorMode("light");
							}}
							className="flex w-full justify-start gap-2 whitespace-nowrap rounded-none p-2"
						>
							<FiSun className="size-4" aria-hidden="true" />
							{showLabel && colorModeLabel.light}
						</Pill>
					</Menu.Item>
					<Menu.Item className="border-0! p-0! focus-visible:outline-none">
						<Pill
							active={colorMode === "dark"}
							title="Dark Theme"
							onClick={() => {
								setColorMode("dark");
							}}
							className="flex w-full justify-start gap-2 whitespace-nowrap rounded-b-md rounded-t-none p-2"
						>
							<FiMoon className="size-4" aria-hidden="true" />
							{showLabel && colorModeLabel.dark}
						</Pill>
					</Menu.Item>
				</>
			</Menu>
		</div>
	);
}
