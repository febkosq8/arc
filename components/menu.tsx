import Pill from "@feb/pill";
import { faChevronDown, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as DropdownBaseMenu from "@radix-ui/react-dropdown-menu";
import { cx } from "@rinzai/zen";
import { Children, ComponentPropsWithoutRef, ReactNode, isValidElement } from "react";

interface MenuProps {
	className?: string;
	active?: boolean;
	buttonText: string | ReactNode;
	children: ReactNode;
}

interface MenuComponent extends React.FC<MenuProps> {
	Item: typeof MenuItem;
	Sub: typeof MenuSub;
}

type MenuItemProps = ComponentPropsWithoutRef<typeof DropdownBaseMenu.Item> & {
	active?: boolean;
};

const MenuItem = ({ active, className, ...props }: MenuItemProps) => {
	return (
		<DropdownBaseMenu.Item
			{...props}
			className={cx(
				"flex min-h-10 w-full cursor-default items-center justify-start rounded-none! px-3 py-2 text-base font-medium text-popover-foreground outline-none select-none",
				"data-highlighted:bg-accent data-highlighted:text-primary",
				"focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
				"*:rounded-none!",
				active && "text-primary!",
				className,
			)}
		/>
	);
};

const MenuComponent = ({ className, active, buttonText, children }: MenuProps) => {
	return (
		<DropdownBaseMenu.Root>
			<DropdownBaseMenu.Trigger asChild>
				<Pill active={active} className={cx("w-fit", className)}>
					{buttonText}
					<FontAwesomeIcon icon={faChevronDown} className="-mr-1 ml-2 h-4 w-4" aria-hidden="true" />
				</Pill>
			</DropdownBaseMenu.Trigger>
			<DropdownBaseMenu.Portal>
				<DropdownBaseMenu.Content
					loop={true}
					sideOffset={8}
					className="z-50 flex w-fit min-w-40 origin-top-right flex-col overflow-hidden divide-y divide-border rounded-md border border-border bg-popover shadow-lg ring-1 ring-foreground/10 focus:outline-none"
				>
					{children}
				</DropdownBaseMenu.Content>
			</DropdownBaseMenu.Portal>
			</DropdownBaseMenu.Root>
	);
};

interface MenuSubProps {
	active?: boolean;
	buttonText: string | ReactNode;
	children: ReactNode;
}

const MenuSub = ({ active, buttonText, children }: MenuSubProps) => {
	const hasActiveChild = Children.toArray(children).some(
		(child) => isValidElement<MenuItemProps>(child) && child.type === MenuItem && child.props.active,
	);
	const isActive = active || hasActiveChild;
	const submenu = (
		<DropdownBaseMenu.Sub>
			<DropdownBaseMenu.SubTrigger asChild>
				<Pill active={isActive} className="flex w-full items-center justify-between rounded-none px-3 py-2 text-base">
					{buttonText}
					<FontAwesomeIcon icon={faChevronRight} className="-mr-1 ml-2 h-4 w-4" aria-hidden="true" />
				</Pill>
			</DropdownBaseMenu.SubTrigger>
			<DropdownBaseMenu.Portal>
				<DropdownBaseMenu.SubContent
					loop={true}
					sideOffset={8}
					arrowPadding={2}
					className="z-50 flex w-fit min-w-40 origin-top-right flex-col overflow-hidden divide-y divide-border rounded-md border border-border bg-popover shadow-lg ring-1 ring-foreground/10 focus:outline-none"
				>
					{children}
					<DropdownBaseMenu.Arrow className="size-2 fill-popover" />
				</DropdownBaseMenu.SubContent>
			</DropdownBaseMenu.Portal>
		</DropdownBaseMenu.Sub>
	);

	return (
		<div className="arc-menu-sub">
			{submenu}
		</div>
	);
};

const Menu: MenuComponent = Object.assign(MenuComponent, {
	Item: MenuItem,
	Sub: MenuSub,
});

export default Menu;
