import { Menu as BaseMenu } from "@base-ui/react/menu";
import Pill from "@feb/pill";
import { cx } from "@rinzai/zen";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import { Children, ComponentPropsWithoutRef, Fragment, ReactNode, isValidElement } from "react";

interface MenuProps {
	className?: string;
	contentClassName?: string;
	active?: boolean;
	activeClassName?: string;
	buttonText: string | ReactNode;
	children: ReactNode;
}

interface MenuComponent extends React.FC<MenuProps> {
	Item: typeof MenuItem;
	Sub: typeof MenuSub;
}

const MenuChildren = ({ children }: { children: ReactNode }) => {
	const items = Children.toArray(children);

	return items.map((child, index) => (
		<Fragment key={index}>
			{index > 0 && <BaseMenu.Separator className="mx-2 h-px bg-border" />}
			{child}
		</Fragment>
	));
};

type MenuItemProps = Omit<ComponentPropsWithoutRef<typeof BaseMenu.Item>, "className" | "render"> & {
	active?: boolean;
	asChild?: boolean;
	className?: string;
};

const MenuItem = ({ active, asChild = false, className, nativeButton, children, ...props }: MenuItemProps) => {
	const itemClassName = cx(
		"flex min-h-10 w-full cursor-default items-center justify-start rounded-md border border-transparent px-3 py-2 text-base font-medium text-foreground outline-none select-none",
		"data-highlighted:bg-accent data-highlighted:text-primary",
		"focus-visible:ring-0",
		active && "text-primary!",
		className,
	);

	if (asChild) {
		const child = Children.only(children);
		if (!isValidElement(child)) {
			throw new Error("Menu.Item with asChild requires a single React element child.");
		}

		return (
			<BaseMenu.Item
				{...props}
				className={itemClassName}
				nativeButton={nativeButton ?? true}
				render={child}
			/>
		);
	}

	return (
		<BaseMenu.Item {...props} className={itemClassName} nativeButton={nativeButton}>
			{children}
		</BaseMenu.Item>
	);
};

const MenuComponent = ({ className, contentClassName, active, activeClassName, buttonText, children }: MenuProps) => {
	return (
		<BaseMenu.Root loopFocus>
			<BaseMenu.Trigger
				render={<Pill active={active} className={cx("w-fit", active && activeClassName, className)} />}
			>
				{buttonText}
				<FiChevronDown className="-mr-1 ml-2 h-4 w-4" aria-hidden="true" />
			</BaseMenu.Trigger>
			<BaseMenu.Portal>
				<BaseMenu.Positioner className="z-50" sideOffset={8}>
					<BaseMenu.Popup
						className={cx(
							"arc-menu-content z-50 flex w-fit min-w-40 origin-top-right flex-col overflow-hidden rounded-md border border-border text-foreground shadow-lg ring-1 ring-foreground/10 focus:outline-none",
							contentClassName,
						)}
					>
						<MenuChildren>{children}</MenuChildren>
					</BaseMenu.Popup>
				</BaseMenu.Positioner>
			</BaseMenu.Portal>
		</BaseMenu.Root>
	);
};

interface MenuSubProps {
	active?: boolean;
	buttonText: string | ReactNode;
	children: ReactNode;
}

const MenuSub = ({ active, buttonText, children }: MenuSubProps) => {
	const hasActiveChild = Children.toArray(children).some(
		(child) => isValidElement<MenuItemProps>(child) && child.props.active,
	);
	const isActive = active || hasActiveChild;

	return (
		<BaseMenu.SubmenuRoot loopFocus>
			<BaseMenu.SubmenuTrigger
				className={cx(
					"arc-pill arc-menu-sub-trigger inline-flex h-10 w-full items-center justify-between whitespace-nowrap rounded-md border border-transparent px-3 py-2 text-base font-medium text-foreground transition focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-opacity-75",
					"data-highlighted:bg-accent data-highlighted:text-primary",
					isActive && "text-primary!",
				)}
			>
				{buttonText}
				<FiChevronRight className="-mr-1 ml-2 h-4 w-4" aria-hidden="true" />
			</BaseMenu.SubmenuTrigger>
			<BaseMenu.Portal>
				<BaseMenu.Positioner className="z-50" side="right" align="start" sideOffset={8}>
					<BaseMenu.Popup className="arc-menu-content z-50 flex w-fit min-w-40 origin-top-right flex-col overflow-hidden rounded-md border border-border text-foreground shadow-lg ring-1 ring-foreground/10 focus:outline-none">
						<MenuChildren>{children}</MenuChildren>
					</BaseMenu.Popup>
				</BaseMenu.Positioner>
			</BaseMenu.Portal>
		</BaseMenu.SubmenuRoot>
	);
};

const Menu: MenuComponent = Object.assign(MenuComponent, {
	Item: MenuItem,
	Sub: MenuSub,
});

export default Menu;
