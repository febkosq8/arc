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
	argTypes: {
		id: { control: false, table: { disable: true } },
		className: { control: false, table: { disable: true } },
		name: { control: false, table: { disable: true } },
		"data-name": { control: false, table: { disable: true } },
		"data-required": { control: false, table: { disable: true } },
	},
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
				method: "alphabetical",
				order: ["Theme", "Components", "Utilities"],
			},
		},
	},
};

export default preview;
