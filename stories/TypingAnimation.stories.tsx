import type { Meta, StoryObj } from "@storybook/react-vite";
import type { InputType } from "storybook/internal/types";
import { TypingAnimation } from "../components";

// Dot-notation keys give each nested prop its own control.
const nestedArgTypes: Record<string, InputType> = {
	"perTick.amount": {
		control: { type: "number", min: 1, step: 1 },
		description: "Amount advanced on each animation tick.",
		table: { defaultValue: { summary: "1" } },
	},
	"perTick.unit": {
		control: "select",
		options: ["character", "word"],
		description: "Unit advanced on each animation tick.",
		table: { defaultValue: { summary: "character" } },
	},
	"delay.typing": {
		control: { type: "number", min: 0, step: 10 },
		description: "Delay between typed units in milliseconds.",
		table: { defaultValue: { summary: "110" } },
	},
	"delay.deleting": {
		control: { type: "number", min: 0, step: 10 },
		description: "Delay between deleted units in milliseconds.",
		table: { defaultValue: { summary: "55" } },
	},
	"delay.hold": {
		control: { type: "number", min: 0, step: 100 },
		description: "Hold time after a string finishes, in milliseconds.",
		table: { defaultValue: { summary: "1800" } },
	},
};

const flatArgs = {
	"perTick.amount": 1,
	"perTick.unit": "character" as "character" | "word",
	"delay.typing": 110,
	"delay.deleting": 55,
	"delay.hold": 1800,
};

const meta = {
	title: "Components/TypingAnimation",
	component: TypingAnimation,
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component: "Types out and deletes a sequence of strings, with configurable speed, delays and looping.",
			},
		},
	},
	argTypes: {
		strings: { control: "object", description: "Strings to type in sequence." },
		placeholder: {
			control: "text",
			description: "Invisible text used to reserve the layout width.",
			table: { defaultValue: { summary: "strings[0]" } },
		},
		perTick: { table: { disable: true } },
		delay: { table: { disable: true } },
		...nestedArgTypes,
		waitTillVisible: {
			control: "boolean",
			description: "Wait until the element scrolls into view before starting.",
			table: { defaultValue: { summary: "true" } },
		},
		pauseWhenHidden: {
			control: "boolean",
			description: "Pause the animation while the element is out of view.",
			table: { defaultValue: { summary: "true" } },
		},
		loop: {
			control: "boolean",
			description: "Restart from the first string after the last one finishes.",
			table: { defaultValue: { summary: "strings.length > 1" } },
		},
		visibilityThreshold: {
			control: { type: "number", min: 0, max: 1, step: 0.1 },
			description: "Fraction of the element (0 to 1) that must be visible to count as in view.",
			table: { defaultValue: { summary: "0" } },
		},
		afterString: {
			control: "select",
			options: ["clear", "newline", "comma"],
			description:
				"What happens when a string finishes: delete it, or keep it and add a line break or comma before the next.",
			table: { defaultValue: { summary: "clear" } },
		},
	},
	args: {
		strings: ["Build carefully", "Ship thoughtfully", "Keep learning"],
		placeholder: "",
		...flatArgs,
		waitTillVisible: true,
		pauseWhenHidden: true,
		loop: true,
		visibilityThreshold: 0,
		afterString: "clear",
	},
	render: (args) => {
		const {
			"perTick.amount": amount,
			"perTick.unit": unit,
			"delay.typing": typing,
			"delay.deleting": deleting,
			"delay.hold": hold,
			...rest
		} = args as typeof args & typeof flatArgs;
		return <TypingAnimation {...rest} perTick={{ amount, unit }} delay={{ typing, deleting, hold }} />;
	},
} satisfies Meta<typeof TypingAnimation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
