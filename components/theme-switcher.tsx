import Menu from "@feb/menu";
import Pill from "@feb/pill";
import { FiMonitor, FiMoon, FiSun } from "react-icons/fi";
import { useEffect, useState } from "react";

type Color = "light" | "dark" | "system";

export interface ThemeSwitcherProps {
	variant?: "dropdown" | "toggle";
}

const colorModeIcon = { light: FiSun, dark: FiMoon, system: FiMonitor };
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

export default function ThemeSwitcher({ variant = "dropdown" }: ThemeSwitcherProps) {
	const [colorMode, setColorMode] = useState<Color>(getStoredColorMode);

	useEffect(() => {
		if (typeof window === "undefined") {
			return;
		}

		document.documentElement.classList.toggle("dark", isDarkColorMode(colorMode));
		window.localStorage.setItem(localStorageString, colorMode);
	}, [colorMode]);

	const toggleColorMode = () => {
		setColorMode(isDarkColorMode(colorMode) ? "light" : "dark");
	};

	if (variant === "toggle") {
		const isDark = isDarkColorMode(colorMode);
		const ColorModeIcon = colorModeIcon[colorMode];

		return (
			<div className="arc-theme-switcher">
				<Pill
					active={isDark}
					aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
					title={`Switch to ${isDark ? "light" : "dark"} theme`}
					onClick={toggleColorMode}
				>
					<ColorModeIcon aria-hidden="true" />
				</Pill>
			</div>
		);
	}

	const ColorModeIcon = colorModeIcon[colorMode];

	return (
		<div className="arc-theme-switcher">
			<Menu buttonText={<ColorModeIcon aria-hidden="true" />}>
				<>
					<Menu.Item className="focus-visible:outline-none">
						<Pill
							active={colorMode === "system"}
							title="System Theme"
							onClick={() => {
								setColorMode("system");
							}}
							className="flex w-full whitespace-nowrap rounded-t-sm rounded-b-none p-6"
						>
							<FiMonitor className="size-4" aria-hidden="true" />
						</Pill>
					</Menu.Item>
					<Menu.Item className="focus-visible:outline-none">
						<Pill
							active={colorMode === "light"}
							title="Light Theme"
							onClick={() => {
								setColorMode("light");
							}}
							className="flex w-full whitespace-nowrap rounded-none p-6"
						>
							<FiSun className="size-4" aria-hidden="true" />
						</Pill>
					</Menu.Item>
					<Menu.Item className="focus-visible:outline-none">
						<Pill
							active={colorMode === "dark"}
							title="Dark Theme"
							onClick={() => {
								setColorMode("dark");
							}}
							className="flex w-full whitespace-nowrap rounded-b-sm rounded-t-none p-6"
						>
							<FiMoon className="size-4" aria-hidden="true" />
						</Pill>
					</Menu.Item>
				</>
			</Menu>
		</div>
	);
}
