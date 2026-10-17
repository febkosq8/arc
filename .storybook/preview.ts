/// <reference types="vite/client" />

import type { Preview } from "@storybook/react-vite";
import { createElement, useEffect } from "react";
import "../components/index.css";

const preview: Preview = {
	globalTypes: {
		theme: {
			description: "Global theme for components",
			defaultValue: "dark",
			toolbar: {
				icon: "paintbrush",
				items: [
					{ value: "light", title: "Light" },
					{ value: "dark", title: "Dark" },
				],
			},
		},
	},
	decorators: [
		(Story, context) => {
			const isDark = context.globals.theme === "dark";

			useEffect(() => {
				document.documentElement.classList.toggle("dark", isDark);
				document.documentElement.dataset.theme = isDark ? "dark" : "light";

				return () => {
					document.documentElement.classList.remove("dark");
					delete document.documentElement.dataset.theme;
				};
			}, [isDark]);

			return createElement(
				"div",
				{
					className: "arc-story",
					style: {
						backgroundColor: "hsl(var(--background))",
						color: "hsl(var(--foreground))",
					},
				},
				createElement(Story),
			);
		},
	],
	parameters: {
		docs: {
			title: "Arc",
			description: {
				component: "A React Component Library for Febkosq8",
			},
		},
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
		options: {
			storySort: {
				order: [
					"Theme",
					"Button",
					"ButtonGroup",
					"ButtonDoubleClick",
					"ButtonLongPress",
					"Card",
					"Input",
					"Menu",
					"Pill",
					"Switch",
					"ThemeSwitcher",
				],
			},
		},
	},
};

export default preview;
