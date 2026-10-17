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
	"msDelay.typing": {
		control: { type: "number", min: 0, step: 10 },
		description: "Delay between typed units in milliseconds.",
		table: { defaultValue: { summary: "110" } },
	},
	"msDelay.deleting": {
		control: { type: "number", min: 0, step: 10 },
		description: "Delay between deleted units in milliseconds.",
		table: { defaultValue: { summary: "55" } },
	},
	"msDelay.hold": {
		control: { type: "number", min: 0, step: 100 },
		description: "Hold time after a string finishes, in milliseconds.",
		table: { defaultValue: { summary: "1800" } },
	},
	"msDelay.dot": {
		control: { type: "number", min: 50, step: 50 },
		description: "Blink interval of the trailing dot in milliseconds.",
		table: { defaultValue: { summary: "500" } },
	},
};

const flatArgs = {
	"perTick.amount": 1,
	"perTick.unit": "character" as "character" | "word",
	"msDelay.typing": 110,
	"msDelay.deleting": 55,
	"msDelay.hold": 1800,
	"msDelay.dot": 500,
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
		msDelay: { table: { disable: true } },
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
		minVisiblePercent: {
			control: { type: "number", min: 0, max: 100, step: 10 },
			description: "Percentage of the element (0 to 100) that must be visible to count as in view.",
			table: { defaultValue: { summary: "0" } },
		},
		trailingDot: {
			control: "boolean",
			description: "Blink a trailing dot after a string finishes, until the next string starts.",
			table: { defaultValue: { summary: "false" } },
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
		minVisiblePercent: 0,
		afterString: "clear",
		trailingDot: false,
	},
	render: (args) => {
		const {
			"perTick.amount": amount,
			"perTick.unit": unit,
			"msDelay.typing": typing,
			"msDelay.deleting": deleting,
			"msDelay.hold": hold,
			"msDelay.dot": dot,
			...rest
		} = args as typeof args & typeof flatArgs;
		return <TypingAnimation {...rest} perTick={{ amount, unit }} msDelay={{ typing, deleting, hold, dot }} />;
	},
} satisfies Meta<typeof TypingAnimation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
