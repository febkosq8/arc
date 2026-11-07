import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import { cx } from "@rinzai/zen";
import type { ComponentPropsWithoutRef } from "react";

export type TabsListProps = ComponentPropsWithoutRef<typeof BaseTabs.List>;

const TabsList = ({ className, ...props }: TabsListProps) => (
	<BaseTabs.List
		className={cx(
			"-m-2 flex min-w-0 flex-nowrap items-center gap-3 overflow-x-auto p-2 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch",
			className as string,
		)}
		{...props}
	/>
);

export default TabsList;
