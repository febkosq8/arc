import { DateTime } from "luxon";
import type { DurationLike, ToRelativeOptions } from "luxon";

/** Any Luxon format string; common values are listed for editor suggestions. */
export type DateTimeFormat =
	| (string & {})
	| "dd/MMM/yyyy hh:mm:ss a"
	| "dd/MM/yyyy"
	| "MMM d, yyyy"
	| "yyyy-MM-dd"
	| "yyyy-MM-dd'T'HH:mm:ss"
	| "HH:mm:ss"
	| "hh:mm a"
	| "cccc, dd LLLL yyyy 'at' hh:mm a"
	| "D"
	| "DD"
	| "DDD"
	| "t"
	| "T"
	| "f"
	| "F";

/** Any template string; the listed placeholders are replaced with formatted date values. */
export type FormattedTimeTemplate =
	(string & {}) | "$ISO$ ($RELATIVE$)" | "$ISO$" | "$RELATIVE$" | "$ISO$ - $RELATIVE$" | "$RELATIVE$ - $ISO$";

export class DateHandler {
	private static toDateTime(date: unknown): DateTime {
		if (date === undefined || date === null || date === "") {
			return DateTime.invalid("missing date");
		}

		if (date instanceof Date) {
			return DateTime.fromJSDate(date);
		}

		if (typeof date === "number") {
			return DateTime.fromMillis(date);
		}

		if (typeof date === "bigint") {
			return DateTime.fromMillis(Number(date));
		}

		if (typeof date === "string") {
			const trimmedDate = date.trim();
			if (trimmedDate === "") {
				return DateTime.invalid("missing date");
			}

			const millisPattern = /^-?\d+$/;
			if (millisPattern.test(trimmedDate)) {
				const millis = Number(trimmedDate.length === 10 ? Number(trimmedDate) * 1000 : trimmedDate);
				return DateTime.fromMillis(millis);
			}

			return DateTime.fromISO(trimmedDate);
		}

		return DateTime.fromJSDate(new Date(String(date)));
	}

	static getDateTime(date: unknown, format: DateTimeFormat = "dd/MMM/yyyy hh:mm:ss a"): string {
		const dateTime = DateHandler.toDateTime(date);
		return dateTime.isValid ? dateTime.toFormat(format) : "";
	}

	static getRelativeTime(date: unknown, options?: ToRelativeOptions): string {
		const dateTime = DateHandler.toDateTime(date);
		return dateTime.isValid ? (dateTime.toRelative(options) ?? "") : "";
	}

	/** Format a whole-unit duration. Months are 30 days and years are 365 days. */
	static formatDuration(
		value: number,
		{
			unit = "seconds",
		}: {
			unit?: "milliseconds" | "seconds" | "minutes" | "hours" | "days" | "months" | "years";
		} = {},
	): string {
		if (!Number.isSafeInteger(value) || value < 0) {
			throw new RangeError("Duration must be a non-negative safe integer");
		}

		const units = [
			["years", "year", 31_536_000_000n],
			["months", "month", 2_592_000_000n],
			["days", "day", 86_400_000n],
			["hours", "hour", 3_600_000n],
			["minutes", "minute", 60_000n],
			["seconds", "second", 1_000n],
			["milliseconds", "millisecond", 1n],
		] as const;
		const inputUnit = units.find(([name]) => name === unit);
		if (!inputUnit) throw new RangeError(`Unsupported duration unit: ${unit}`);
		let remaining = BigInt(value) * inputUnit[2];
		const parts: string[] = [];
		for (const [, name, size] of units) {
			const count = remaining / size;
			remaining %= size;
			if (count > 0n) parts.push(`${count} ${name}${count === 1n ? "" : "s"}`);
		}
		return parts.length ? parts.join(", ") : `0 ${unit}`;
	}

	static getTimeDiff(date: unknown): string | null {
		const dateTime = DateHandler.toDateTime(date);
		if (!dateTime.isValid) {
			return null;
		}
		const diff = dateTime
			.diffNow(["years", "quarters", "months", "weeks", "days", "hours", "minutes", "seconds"])
			.toObject();
		const units: string[] = [];
		for (const unit of ["years", "quarters", "months", "weeks", "days", "hours", "minutes", "seconds"] as const) {
			if (diff[unit] && Math.abs(diff[unit]!) >= 1) {
				units.push(`${Math.abs(Math.floor(diff[unit]!))} ${unit}`);
			}
		}
		return units.length > 0 ? units.join(", ") : null;
	}

	static generateOffsetDateTime({
		offset,
		future = true,
		format = "dd/MM/yyyy hh:mm:ss a",
	}: {
		offset: DurationLike;
		future?: boolean;
		format?: DateTimeFormat | null;
	}): string {
		const date = future ? DateTime.now().plus(offset) : DateTime.now().minus(offset);
		return format ? date.toFormat(format) : date.toISO();
	}

	static getFormattedTime(date: unknown, format: FormattedTimeTemplate = `$ISO$ ($RELATIVE$)`): string {
		const isoFormat = DateHandler.getDateTime(date);
		const relativeFormat = DateHandler.getRelativeTime(date);
		return format.replace("$ISO$", isoFormat).replace("$RELATIVE$", relativeFormat);
	}
}
