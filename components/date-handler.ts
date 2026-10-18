import { DateTime } from "luxon";
import type { DurationLike, ToRelativeOptions } from "luxon";

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

	static getDateTime(date: unknown, format: string = "dd/MMM/yyyy hh:mm:ss a"): string {
		const dateTime = DateHandler.toDateTime(date);
		return dateTime.isValid ? dateTime.toFormat(format) : "";
	}

	static getRelativeTime(date: unknown, options?: ToRelativeOptions): string {
		const dateTime = DateHandler.toDateTime(date);
		return dateTime.isValid ? (dateTime.toRelative(options) ?? "") : "";
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
		format?: string | null;
	}): string {
		const date = future ? DateTime.now().plus(offset) : DateTime.now().minus(offset);
		return format ? date.toFormat(format) : date.toISO();
	}

	static getFormattedTime(date: unknown, format = `$ISO$ ($RELATIVE$)`): string {
		const isoFormat = DateHandler.getDateTime(date);
		const relativeFormat = DateHandler.getRelativeTime(date);
		return format.replace("$ISO$", isoFormat).replace("$RELATIVE$", relativeFormat);
	}
}
