import { useEffect, useRef } from "react";
import { cx } from "@rinzai/zen";
import Button, { type ButtonProps } from "./button";

export interface LongPressButtonProps extends ButtonProps {
	longPressDuration?: number;
	onLongPress?: (event: React.PointerEvent<HTMLButtonElement>) => void;
	preventClick?: boolean;
}

const LongPressButton = ({
	longPressDuration = 500,
	onLongPress,
	onClick,
	preventClick = true,
	...props
}: LongPressButtonProps) => {
	const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
	const longPressRef = useRef(false);

	const clearPress = () => {
		if (timerRef.current) clearTimeout(timerRef.current);
		timerRef.current = undefined;
	};

	useEffect(() => clearPress, []);

	return (
		<Button
			{...props}
			className={cx("arc-long-press-button", props.className)}
			onPointerDown={(event) => {
				props.onPointerDown?.(event);
				longPressRef.current = false;
				clearPress();
				timerRef.current = setTimeout(() => {
					longPressRef.current = true;
					onLongPress?.(event);
				}, longPressDuration);
			}}
			onPointerUp={(event) => {
				props.onPointerUp?.(event);
				clearPress();
			}}
			onPointerLeave={(event) => {
				props.onPointerLeave?.(event);
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
	);
};

export default LongPressButton;
