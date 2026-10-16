import { cx } from "@rinzai/zen";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import Button, { type ButtonProps } from "./button";

export interface DoubleClickButtonProps extends ButtonProps {
	doubleClickTimeout?: number;
	feedbackVariant?: Exclude<ButtonProps["variant"], "ghost">;
	feedbackContent?: ReactNode;
}

const DoubleClickButton = ({
	doubleClickTimeout = 2000,
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
	const [isActive, setIsActive] = useState(false);
	const [isWaiting, setIsWaiting] = useState(false);
	const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
	const feedbackRingClass = {
		primary: "ring-primary",
		secondary: "ring-secondary-foreground",
		destructive: "ring-destructive",
		ghost: "ring-accent-foreground",
		warning: "ring-warning",
		"outline-primary": "ring-primary",
		"outline-secondary": "ring-secondary-foreground",
		"outline-destructive": "ring-destructive",
		"outline-ghost": "ring-accent-foreground",
		"outline-warning": "ring-warning",
	}[feedbackVariant ?? "warning"];
	const feedbackColor = {
		primary: "var(--color-primary)",
		secondary: "var(--color-secondary-foreground)",
		destructive: "var(--color-destructive)",
		ghost: "var(--color-accent-foreground)",
		warning: "var(--color-warning)",
		"outline-primary": "var(--color-primary)",
		"outline-secondary": "var(--color-secondary-foreground)",
		"outline-destructive": "var(--color-destructive)",
		"outline-ghost": "var(--color-accent-foreground)",
		"outline-warning": "var(--color-warning)",
	}[feedbackVariant ?? "warning"];

	useEffect(() => () => {
		if (timerRef.current) clearTimeout(timerRef.current);
	}, []);

	const buttonContent =
		feedbackContent === undefined ? (
			children
		) : (
			<span className="grid">
				<span
					className={cx(
						"col-start-1 row-start-1",
						isWaiting ? "invisible" : "visible",
					)}
					aria-hidden={isWaiting}
				>
					{children}
				</span>
				<span
					className={cx(
						"col-start-1 row-start-1",
						isWaiting ? "visible" : "invisible",
					)}
					aria-hidden={!isWaiting}
				>
					{feedbackContent}
				</span>
			</span>
		);

	const button = (
		<Button
			{...props}
			children={buttonContent}
			className={cx(
				className,
				isActive &&
					`ring-4 ${feedbackRingClass} ring-offset-2 shadow-lg scale-105 double-click-feedback`,
			)}
			style={{
			...style,
			...(isActive && {
				"--double-click-timeout": `${doubleClickTimeout}ms`,
				animation: "double-click-feedback var(--double-click-timeout) ease-out forwards",
			}),
			} as CSSProperties & { "--double-click-timeout"?: string }}
			variant={isActive ? feedbackVariant : variant}
			data-double-click-state={isActive ? "active" : isWaiting ? "waiting" : undefined}
			onClick={(event) => {
				if (event.detail === 1) {
					setIsWaiting(true);
					if (timerRef.current) clearTimeout(timerRef.current);
					timerRef.current = setTimeout(() => setIsWaiting(false), doubleClickTimeout);
				}
				onClick?.(event);
			}}
			onDoubleClick={(event) => {
				onDoubleClick?.(event);
				setIsWaiting(false);
				setIsActive(true);
				if (timerRef.current) clearTimeout(timerRef.current);
				timerRef.current = setTimeout(() => setIsActive(false), doubleClickTimeout);
			}}
		/>
	);

	return (
		<span
			aria-label={isWaiting ? "Waiting for second click" : undefined}
			className="relative inline-flex rounded-md p-0.5"
			data-double-click-state={isWaiting ? "waiting" : undefined}
		>
			<span
				aria-hidden="true"
				className="double-click-progress-ring pointer-events-none absolute inset-0 rounded-md p-0.5"
				style={
				{
					background: isWaiting
						? `linear-gradient(to right, color-mix(in srgb, ${feedbackColor} 90%, white) calc(var(--double-click-progress) * 1%), transparent 0)`
						: "transparent",
					"--double-click-progress": 100,
					"--double-click-timeout": `${doubleClickTimeout}ms`,
					animation: isWaiting
						? "double-click-countdown var(--double-click-timeout) linear forwards"
						: "none",
				} as CSSProperties & {
					"--double-click-progress": number;
					"--double-click-timeout": string;
				}
				}
			/>
			{button}
		</span>
	);
};

export default DoubleClickButton;
