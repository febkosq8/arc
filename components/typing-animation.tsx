import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

export type TypingAnimationPerTickUnit = "character" | "word";
export type TypingAnimationAfterString = "clear" | "newline" | "comma";

export interface TypingAnimationProps {
	strings: string[];
	placeholder?: string;
	perTick?: {
		amount?: number;
		unit?: TypingAnimationPerTickUnit;
	};
	delay?: {
		typing?: number;
		deleting?: number;
		hold?: number;
	};
	waitTillVisible?: boolean;
	pauseWhenHidden?: boolean;
	loop?: boolean;
	visibilityThreshold?: number;
	afterString?: TypingAnimationAfterString;
}

function getAfterStringSeparator(afterString: TypingAnimationAfterString) {
	if (afterString === "newline") return "\n";
	if (afterString === "comma") return ", ";
	return "";
}

function getNextIndex(
	text: string,
	index: number,
	amount: number,
	unit: TypingAnimationPerTickUnit,
	direction: 1 | -1,
) {
	if (unit === "character") {
		return Math.max(0, Math.min(text.length, index + amount * direction));
	}

	const wordBoundaries = [...text.matchAll(/\S+\s*/g)].map((match) => match.index! + match[0].length);
	let nextIndex = index;

	for (let step = 0; step < amount; step += 1) {
		if (direction === 1) {
			nextIndex = wordBoundaries.find((boundary) => boundary > nextIndex) ?? text.length;
		} else {
			nextIndex = [...wordBoundaries].reverse().find((boundary) => boundary < nextIndex) ?? 0;
		}
	}

	return nextIndex;
}

export default function TypingAnimation({
	strings,
	placeholder,
	perTick = { amount: 1, unit: "character" },
	delay = { typing: 110, deleting: 55, hold: 1800 },
	waitTillVisible = true,
	pauseWhenHidden = true,
	loop = strings.length > 1,
	visibilityThreshold = 0,
	afterString = "clear",
}: TypingAnimationProps) {
	const typingDelay = delay?.typing ?? 110;
	const deletingDelay = delay?.deleting ?? 55;
	const holdDelay = delay?.hold ?? 1800;
	const tickAmountInput = perTick?.amount ?? 1;
	const tickAmount = Number.isFinite(tickAmountInput) ? Math.max(1, Math.floor(tickAmountInput)) : 1;
	const tickUnit = perTick?.unit ?? "character";
	const [currentText, setCurrentText] = useState("");
	const [finishedStrings, setFinishedStrings] = useState<string[]>([]);
	const [isVisible, setIsVisible] = useState(!waitTillVisible);
	const containerRef = useRef<HTMLDivElement | HTMLSpanElement>(null);
	const stringIndexRef = useRef(0);
	const characterIndexRef = useRef(0);
	const delayRemainingRef = useRef(0);
	const delayOutputRef = useRef("");
	const deletingRef = useRef(false);

	useEffect(() => {
		if (!waitTillVisible) return;

		const element = containerRef.current;
		if (!element) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsVisible(true);
				} else if (pauseWhenHidden) {
					setIsVisible(false);
				}
			},
			{ root: element.closest("main"), threshold: visibilityThreshold },
		);

		observer.observe(element);
		return () => observer.disconnect();
	}, [pauseWhenHidden, waitTillVisible, visibilityThreshold]);

	useEffect(() => {
		if (!isVisible || strings.length === 0) return;

		let timeout: ReturnType<typeof setTimeout>;
		const accumulate = afterString !== "clear";
		stringIndexRef.current = 0;
		characterIndexRef.current = 0;
		delayRemainingRef.current = 0;
		delayOutputRef.current = "";
		deletingRef.current = false;
		setCurrentText("");
		setFinishedStrings([]);

		const animate = () => {
			if (!loop && stringIndexRef.current >= strings.length) return;

			const string = strings[stringIndexRef.current];
			const delayMatch = string.match(/^<--delay-(\d+)-->$/);
			if (delayMatch) {
				if (delayRemainingRef.current === 0) {
					delayRemainingRef.current = Number(delayMatch[1]);
					delayOutputRef.current = "";
				}
				if (delayRemainingRef.current <= 0) {
					stringIndexRef.current += 1;
					timeout = setTimeout(animate, typingDelay);
					return;
				}
				delayOutputRef.current += `${delayOutputRef.current ? " " : ""}.`;
				setCurrentText(delayOutputRef.current);
				delayRemainingRef.current -= 1;
				if (delayRemainingRef.current === 0) stringIndexRef.current += 1;
				timeout = setTimeout(animate, 1000);
				return;
			}
			if (accumulate && string === "<--clearAll-->") {
				setFinishedStrings([]);
				setCurrentText("");
				stringIndexRef.current += 1;
				characterIndexRef.current = 0;
				timeout = setTimeout(animate, holdDelay);
				return;
			}

			if (!deletingRef.current) {
				characterIndexRef.current = getNextIndex(string, characterIndexRef.current, tickAmount, tickUnit, 1);
				setCurrentText(string.slice(0, characterIndexRef.current));
				deletingRef.current =
					!accumulate &&
					characterIndexRef.current === string.length &&
					(loop || stringIndexRef.current < strings.length - 1);
				if (!accumulate && characterIndexRef.current === string.length && !deletingRef.current && !loop) return;
				if (accumulate && characterIndexRef.current === string.length) {
					setFinishedStrings((current) => [...current, string]);
					setCurrentText("");
					stringIndexRef.current += 1;
					characterIndexRef.current = 0;
				}
			} else {
				characterIndexRef.current = getNextIndex(string, characterIndexRef.current, tickAmount, tickUnit, -1);
				setCurrentText(string.slice(0, characterIndexRef.current));
				if (characterIndexRef.current === 0) {
					deletingRef.current = false;
					stringIndexRef.current = (stringIndexRef.current + 1) % strings.length;
				}
			}

			const nextDelay =
				characterIndexRef.current >= string.length || (accumulate && characterIndexRef.current === 0)
					? holdDelay
					: deletingRef.current
						? deletingDelay
						: typingDelay;
			timeout = setTimeout(animate, nextDelay);
		};

		animate();
		return () => clearTimeout(timeout);
	}, [deletingDelay, isVisible, loop, holdDelay, afterString, strings, tickAmount, tickUnit, typingDelay]);

	const isAccumulating = afterString !== "clear";
	const separator = getAfterStringSeparator(afterString);
	const rollOffset = finishedStrings.reduce((lineCount, string) => lineCount + string.split("\n").length, 0);

	if (isAccumulating) {
		return (
			<div
				ref={(element) => {
					containerRef.current = element;
				}}
				className="overflow-hidden"
				style={{ "--typing-roll-offset": rollOffset } as CSSProperties}
			>
				<div className="whitespace-pre-line">
					{finishedStrings.join(separator)}
					{currentText && `${finishedStrings.length > 0 ? separator : ""}${currentText}`}
				</div>
			</div>
		);
	}

	return (
		<span
			ref={(element) => {
				containerRef.current = element;
			}}
			className="inline-grid align-top"
		>
			<span aria-hidden="true" className="invisible col-start-1 row-start-1 whitespace-pre-line">
				{placeholder ?? strings[0]}
			</span>
			<span className="col-start-1 row-start-1 whitespace-pre-line">{currentText}</span>
		</span>
	);
}
