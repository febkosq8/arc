import { cva, cx } from "@rinzai/zen";
import { useEffect, useMemo, useState } from "react";

type VariantClassProps = { class?: never; className?: never } | { class?: never; className: string | undefined };

type AvatarVariantOptions = VariantClassProps & {
	size?: "xs" | "sm" | "md" | "lg" | "xl" | null;
};

const avatarVariants: (props?: AvatarVariantOptions) => string = cva(
	"arc-avatar inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted ring-1 ring-border transition-all",
	{
		variants: {
			size: {
				xs: "size-6 text-xs",
				sm: "size-7 text-sm",
				md: "size-8 text-base",
				lg: "size-10 text-lg",
				xl: "size-12 text-xl",
			},
		},
		defaultVariants: {
			size: "md",
		},
	},
);

export type AvatarSize = NonNullable<AvatarVariantOptions["size"]>;

export interface AvatarProps extends React.ComponentPropsWithoutRef<"span"> {
	name?: string | null;
	image?: string | null;
	size?: AvatarSize;
}

const Avatar = ({ name, image: imageSource, size, className, ...props }: AvatarProps) => {
	const [hasImageError, setHasImageError] = useState(false);
	const image = imageSource?.trim();
	const shouldShowImage = !!image && !hasImageError;
	const initials = useMemo(
		() =>
			name
				?.split(" ", 3)
				?.map((word) => word[0])
				?.filter((letter) => /[A-Za-z]/.test(letter))
				?.join("") || "U",
		[name],
	);

	useEffect(() => {
		setHasImageError(false);
	}, [image]);

	return (
		<span className={cx(avatarVariants({ size, className }))} {...props}>
			{shouldShowImage ? (
				<img
					src={image}
					alt={name ?? "User avatar"}
					title={name ?? "User"}
					className="h-full w-full object-cover"
					onError={() => setHasImageError(true)}
				/>
			) : (
				<span className="font-medium leading-none text-foreground" title={name ?? "User"}>
					{initials}
				</span>
			)}
		</span>
	);
};

export default Avatar;
