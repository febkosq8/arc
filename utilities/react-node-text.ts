import { isValidElement, type ReactNode } from "react";

export const getReactNodeText = (node: ReactNode): string => {
	if (node === null || node === undefined || typeof node === "boolean") return "";
	if (typeof node === "string" || typeof node === "number" || typeof node === "bigint") return String(node);
	if (Array.isArray(node)) return node.map(getReactNodeText).join("");
	if (isValidElement<{ children?: ReactNode }>(node)) return getReactNodeText(node.props.children);
	return "";
};
