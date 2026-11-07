import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import { cx } from "@rinzai/zen";
import type { ComponentPropsWithoutRef } from "react";

export type TabsPanelProps = ComponentPropsWithoutRef<typeof BaseTabs.Panel>;

const TabsPanel = ({ className, ...props }: TabsPanelProps) => (
	<BaseTabs.Panel
		className={cx(
			"min-w-0 rounded-md text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-opacity-75",
			className as string,
		)}
		{...props}
	/>
);

export default TabsPanel;
