import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import { cx } from "@rinzai/zen";
import type { ComponentPropsWithoutRef } from "react";

export type TabsProps = ComponentPropsWithoutRef<typeof BaseTabs.Root>;

const Tabs = ({ className, ...props }: TabsProps) => (
	<BaseTabs.Root
		className={cx("flex w-full min-w-0 flex-col gap-3 data-[orientation=vertical]:flex-row", className as string)}
		{...props}
	/>
);

export default Tabs;
