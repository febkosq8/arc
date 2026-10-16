import type { Preview } from "@storybook/react-vite";
import "../components/index.css";

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
		options: {
			storySort: {
				order: [
					"Button",
					"ButtonGroup",
					"ButtonDoubleClick",
					"ButtonLongPress",
					"Card",
					"Input",
					"Menu",
					"Pill",
					"Switch",
					"TextArea",
					"ThemeSwitcher",
				],
			},
		},
	},
};

export default preview;
