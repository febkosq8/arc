import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import { cx } from "@rinzai/zen";
import type { ComponentPropsWithoutRef } from "react";
import Pill, { type PillProps } from "./pill";

export type TabsTabProps = ComponentPropsWithoutRef<typeof BaseTabs.Tab> & Pick<PillProps, "variant" | "size">;

const TabsTab = ({ className, variant = "outline", size, ...props }: TabsTabProps) => (
	<BaseTabs.Tab
		className={className}
		render={(tabProps, state) => (
			<Pill
				{...tabProps}
				// Tabs expose aria-selected; Pill's aria-pressed is wrong for the tab role
				aria-pressed={undefined}
				variant={variant}
				size={size}
				active={state.active}
				className={cx("w-fit shrink-0 data-disabled:cursor-not-allowed data-disabled:opacity-60", tabProps.className)}
			/>
		)}
		{...props}
	/>
);

export default TabsTab;
