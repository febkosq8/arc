import { cx } from "@rinzai/zen";
interface CardProps extends React.ComponentPropsWithoutRef<"div"> {}
const Card = (props: CardProps) => {
	const { className, ...rest } = props;
	return <div className={cx("arc-card card p-4 rounded-lg border shadow-sm", className)} {...rest} />;
};

const Header = (props: CardProps) => {
	const { className, ...rest } = props;
	return <h2 className={cx("arc-card-header card-header flex flex-col typography-heading-2", className)} {...rest} />;
};
const Content = (props: CardProps) => {
	const { className, ...rest } = props;
	return (
		<div
			className={cx("arc-card-content card-content typography-heading-4 justify-between whitespace-pre-wrap py-2", className)}
			{...rest}
		/>
	);
};
const Footer = (props: CardProps) => {
	const { className, ...rest } = props;
	return (
		<div className="arc-card-footer border-t flex justify-start items-center pt-2">
			<h2 className={cx("card-footer text-2xl", className)} {...rest} />
		</div>
	);
};
Card.Header = Header;
Card.Content = Content;
Card.Footer = Footer;
export default Card;
