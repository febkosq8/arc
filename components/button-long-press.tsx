import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { cx } from "@rinzai/zen";
import Button, { type ButtonProps } from "./button";

export interface LongPressButtonFeedbackContext {
	isPressing: boolean;
	isActive: boolean;
	longPressDuration: number;
	remainingTime: number;
	variant: ButtonProps["variant"];
	feedbackVariant: "primary" | "secondary" | "destructive" | "warning";
}

export type LongPressButtonFeedbackContent =
	| ReactNode
	| ((context: LongPressButtonFeedbackContext) => ReactNode);

export interface LongPressButtonProps extends ButtonProps {
	longPressDuration?: number;
	onLongPress?: (event: React.PointerEvent<HTMLButtonElement>) => void;
	preventClick?: boolean;
	feedbackVariant?: LongPressButtonFeedbackContext["feedbackVariant"];
	feedbackContent?: LongPressButtonFeedbackContent;
}

const LongPressButton = ({
	longPressDuration = 2500,
	onLongPress,
	onClick,
	preventClick = true,
	feedbackVariant = "warning",
	feedbackContent,
	variant = "primary",
	children,
	...props
}: LongPressButtonProps) => {
	const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
	const intervalRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
	const deadlineRef = useRef(0);
	const longPressRef = useRef(false);
	const [isPressing, setIsPressing] = useState(false);
	const [remainingTime, setRemainingTime] = useState(0);

	const clearPress = () => {
		if (timerRef.current) clearTimeout(timerRef.current);
		if (intervalRef.current) clearInterval(intervalRef.current);
		timerRef.current = undefined;
		intervalRef.current = undefined;
	};

	useEffect(() => clearPress, []);

	const feedbackColor = {
		primary: "var(--color-primary)",
		secondary: "var(--color-secondary-foreground)",
		destructive: "var(--color-destructive)",
		warning: "var(--color-warning)",
	}[feedbackVariant];
	const resolvedFeedbackContent =
		typeof feedbackContent === "function"
			? feedbackContent({
					isPressing,
					isActive: longPressRef.current,
					longPressDuration,
					remainingTime,
					variant,
					feedbackVariant,
				})
			: feedbackContent;
	const buttonContent =
		resolvedFeedbackContent === undefined ? (
			children
		) : (
			<span className="grid">
				<span className={cx("col-start-1 row-start-1", isPressing ? "invisible" : "visible")} aria-hidden={isPressing}>
					{children}
				</span>
				<span className={cx("col-start-1 row-start-1", isPressing ? "visible" : "invisible")} aria-hidden={!isPressing}>
					{resolvedFeedbackContent}
				</span>
			</span>
		);

	return (
		<span className="arc-long-press-button relative inline-flex rounded-md" data-long-press-state={isPressing ? "pressing" : undefined}>
			<span
				aria-hidden="true"
				className="double-click-progress-ring pointer-events-none absolute inset-0 rounded-md p-px"
				style={{
					background: isPressing
						? `linear-gradient(to right, color-mix(in srgb, ${feedbackColor} 90%, white) calc(var(--double-click-progress) * 1%), transparent 0)`
						: "transparent",
					"--double-click-progress": 100,
					"--double-click-timeout": `${longPressDuration}ms`,
					animation: isPressing
						? "double-click-countdown var(--double-click-timeout) linear forwards"
						: "none",
				} as CSSProperties & {
					"--double-click-progress": number;
					"--double-click-timeout": string;
				}}
			/>
			<Button
				{...props}
				children={buttonContent}
				variant={variant}
				className={cx(props.className)}
				data-long-press-state={isPressing ? "pressing" : undefined}
				onPointerDown={(event) => {
					props.onPointerDown?.(event);
					longPressRef.current = false;
					clearPress();
					const deadline = Date.now() + longPressDuration;
					deadlineRef.current = deadline;
					setIsPressing(true);
					setRemainingTime(longPressDuration);
					intervalRef.current = setInterval(() => {
						setRemainingTime(Math.max(0, deadlineRef.current - Date.now()));
					}, 50);
					timerRef.current = setTimeout(() => {
						longPressRef.current = true;
						setIsPressing(false);
						setRemainingTime(0);
						clearPress();
						onLongPress?.(event);
					}, longPressDuration);
				}}
				onPointerUp={(event) => {
					props.onPointerUp?.(event);
					setIsPressing(false);
					setRemainingTime(0);
					clearPress();
				}}
				onPointerLeave={(event) => {
					props.onPointerLeave?.(event);
					setIsPressing(false);
					setRemainingTime(0);
					clearPress();
				}}
				onClick={(event) => {
					if (longPressRef.current && preventClick) {
						event.preventDefault();
						event.stopPropagation();
						longPressRef.current = false;
						return;
					}
					onClick?.(event);
				}}
			/>
		</span>
	);
};

export default LongPressButton;
