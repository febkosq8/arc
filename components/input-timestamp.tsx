import { useMemo, type ComponentPropsWithoutRef } from "react";
import { DateHandler } from "./date-handler";
import Input from "./input";

export interface InputTimestampProps extends Omit<ComponentPropsWithoutRef<"input">, "value"> {
	value?: unknown;
	format?: string;
}

const InputTimestamp = ({ value, format = `$ISO$ ($RELATIVE$)`, ...rest }: InputTimestampProps) => {
	const formattedValue = useMemo(() => {
		return value ? DateHandler.getFormattedTime(value, format) : "";
	}, [value, format]);
	return (
		<Input type="text" disabled readOnly value={formattedValue} size={Math.max(formattedValue.length, 1)} {...rest} />
	);
};

export default InputTimestamp;
