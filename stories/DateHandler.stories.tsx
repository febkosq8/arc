import type { Meta, StoryObj } from "@storybook/react-vite";
import { DateHandler } from "../components";

type DateHandlerStoryArgs = {
	date: string;
	format: string;
	offsetDays: number;
};

const meta = {
	title: "Utilities/DateHandler",
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component:
					"Date and time helpers for formatting absolute and relative dates, showing elapsed time, and generating dates with offsets.",
			},
		},
	},
	argTypes: {
		date: {
			control: "text",
			description: "Date input accepted by DateHandler, such as an ISO string or millisecond timestamp.",
			table: { type: { summary: "unknown" } },
		},
		format: {
			control: "text",
			description: "Luxon format string passed to getDateTime and generateOffsetDateTime.",
			table: { defaultValue: { summary: "dd/MMM/yyyy hh:mm:ss a" } },
		},
		offsetDays: {
			control: { type: "number", min: 1, max: 365, step: 1 },
			description: "Number of days used to generate future and past examples.",
			table: { defaultValue: { summary: "3" } },
		},
	},
	args: {
		date: "2024-06-15T12:30:00.000Z",
		format: "dd/MMM/yyyy hh:mm:ss a",
		offsetDays: 3,
	},
	render: ({ date, format, offsetDays }) => {
		const results = [
			{ label: "Absolute date", value: DateHandler.getDateTime(date, format) },
			{ label: "Relative time", value: DateHandler.getRelativeTime(date) },
			{ label: "Time difference", value: DateHandler.getTimeDiff(date) ?? "—" },
			{ label: "Combined format", value: DateHandler.getFormattedTime(date) },
			{
				label: `${offsetDays} days in the future`,
				value: DateHandler.generateOffsetDateTime({ offset: { days: offsetDays }, format }),
			},
			{
				label: `${offsetDays} days in the past`,
				value: DateHandler.generateOffsetDateTime({ offset: { days: offsetDays }, future: false, format }),
			},
		];

		return (
			<div className="grid w-full max-w-3xl gap-3 sm:grid-cols-2">
				{results.map(({ label, value }) => (
					<div key={label} className="min-w-0 rounded-md border border-border bg-card p-3">
						<div className="text-sm text-muted-foreground">{label}</div>
						<div className="mt-1 wrap-break-word font-medium text-foreground">{value || "—"}</div>
					</div>
				))}
			</div>
		);
	},
} satisfies Meta<DateHandlerStoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const InvalidDate: Story = {
	args: {
		date: "not a date",
	},
};
