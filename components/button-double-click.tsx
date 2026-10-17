import { cx } from "@rinzai/zen";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import Button, { type ButtonProps } from "./button";

export interface DoubleClickButtonFeedbackContext {
	isWaiting: boolean;
	isActive: boolean;
	doubleClickMsDuration: number;
	remainingTime: number;
	variant: ButtonProps["variant"];
	feedbackVariant: "primary" | "secondary" | "destructive" | "warning";
}

export type DoubleClickButtonFeedbackContent = ReactNode | ((context: DoubleClickButtonFeedbackContext) => ReactNode);

export interface DoubleClickButtonProps extends ButtonProps {
	doubleClickMsDuration?: number;
	feedbackVariant?: "primary" | "secondary" | "destructive" | "warning";
	feedbackContent?: DoubleClickButtonFeedbackContent;
}

const DoubleClickButton = ({
	doubleClickMsDuration = 2000,
	feedbackVariant = "warning",
	feedbackContent,
	variant = "primary",
	children,
	onClick,
	onDoubleClick,
	className,
	style,
	...props
}: DoubleClickButtonProps) => {
	const [isWaiting, setIsWaiting] = useState(false);
	const [remainingTime, setRemainingTime] = useState(0);
	const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
	const intervalRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
	const deadlineRef = useRef(0);
	const feedbackColor = {
		primary: "var(--color-primary)",
		secondary: "var(--color-secondary-foreground)",
		destructive: "var(--color-destructive)",
		warning: "var(--color-warning)",
	}[feedbackVariant ?? "warning"];

	useEffect(
		() => () => {
			if (timerRef.current) clearTimeout(timerRef.current);
			if (intervalRef.current) clearInterval(intervalRef.current);
		},
		[],
	);

	const resolvedFeedbackContent =
		typeof feedbackContent === "function"
			? feedbackContent({
					isWaiting,
					isActive: false,
					doubleClickMsDuration,
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
				<span className={cx("col-start-1 row-start-1", isWaiting ? "invisible" : "visible")} aria-hidden={isWaiting}>
					{children}
				</span>
				<span className={cx("col-start-1 row-start-1", isWaiting ? "visible" : "invisible")} aria-hidden={!isWaiting}>
					{resolvedFeedbackContent}
				</span>
			</span>
		);

	const button = (
		<Button
			{...props}
			children={buttonContent}
			className={cx(className)}
			style={
				{
					...style,
				} as CSSProperties & { "--double-click-timeout"?: string }
			}
			variant={variant}
			data-double-click-state={isWaiting ? "waiting" : undefined}
			onClick={(event) => {
				const isSecondClick = isWaiting && Date.now() <= deadlineRef.current;

				if (isSecondClick) {
					setIsWaiting(false);
					setRemainingTime(0);
					if (timerRef.current) clearTimeout(timerRef.current);
					if (intervalRef.current) clearInterval(intervalRef.current);
					onDoubleClick?.(event);
				} else {
					const deadline = Date.now() + doubleClickMsDuration;
					deadlineRef.current = deadline;
					setIsWaiting(true);
					setRemainingTime(doubleClickMsDuration);
					if (timerRef.current) clearTimeout(timerRef.current);
					if (intervalRef.current) clearInterval(intervalRef.current);
					intervalRef.current = setInterval(() => {
						setRemainingTime(Math.max(0, deadlineRef.current - Date.now()));
					}, 50);
					timerRef.current = setTimeout(() => {
						setIsWaiting(false);
						setRemainingTime(0);
						if (intervalRef.current) clearInterval(intervalRef.current);
					}, doubleClickMsDuration);
				}
				onClick?.(event);
			}}
		/>
	);

	return (
		<span
			aria-label={isWaiting ? "Waiting for second click" : undefined}
			className="arc-double-click-button relative inline-flex"
			data-double-click-state={isWaiting ? "waiting" : undefined}
		>
			{button}
			<span
				aria-hidden="true"
				className="arc-double-click-progress-ring pointer-events-none absolute inset-0 rounded-md p-px"
				style={
					{
						background: isWaiting
							? `conic-gradient(from 90deg, color-mix(in srgb, ${feedbackColor} 90%, white) calc(var(--double-click-progress) * 1%), transparent 0)`
							: "transparent",
						"--double-click-progress": 100,
						"--double-click-timeout": `${doubleClickMsDuration}ms`,
						animation: isWaiting ? "double-click-countdown var(--double-click-timeout) linear forwards" : "none",
					} as CSSProperties & {
						"--double-click-progress": number;
						"--double-click-timeout": string;
					}
				}
			/>
		</span>
	);
};

export default DoubleClickButton;
