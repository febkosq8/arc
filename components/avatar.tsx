import { cva, cx } from "@rinzai/zen";
import { useEffect, useMemo, useState } from "react";

type VariantClassProps = { class?: never; className?: never } | { class?: never; className: string | undefined };

type AvatarVariantOptions = VariantClassProps & {
	size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl" | "8xl" | null;
	variant?: "default" | "ring" | null;
};

const avatarVariants: (props?: AvatarVariantOptions) => string = cva(
	"arc-avatar inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted transition-all",
	{
		variants: {
			size: {
				xs: "size-6 text-xs",
				sm: "size-7 text-sm",
				md: "size-8 text-base",
				lg: "size-10 text-lg",
				xl: "size-12 text-xl",
				"2xl": "size-14 text-2xl",
				"3xl": "size-16 text-3xl",
				"4xl": "size-20 text-4xl",
				"5xl": "size-24 text-5xl",
				"6xl": "size-28 text-6xl",
				"7xl": "size-32 text-7xl",
				"8xl": "size-36 text-8xl",
			},
			variant: {
				default: "ring-1 ring-border",
				ring: "ring-2",
			},
		},
		defaultVariants: {
			size: "md",
			variant: "default",
		},
	},
);

export type AvatarSize = NonNullable<AvatarVariantOptions["size"]>;
export type AvatarRingColor = "primary" | "secondary" | "accent" | "muted" | "destructive" | "success" | "warning";

export interface AvatarProps extends React.ComponentPropsWithoutRef<"span"> {
	name?: string | null;
	image?: string | null;
	size?: AvatarSize;
	variant?: NonNullable<AvatarVariantOptions["variant"]>;
	ringColor?: AvatarRingColor;
}

const ringColorClasses: Record<AvatarRingColor, string> = {
	primary: "ring-primary",
	secondary: "ring-secondary-foreground",
	accent: "arc-avatar--ring-accent",
	muted: "ring-muted-foreground",
	destructive: "ring-destructive",
	success: "ring-success",
	warning: "ring-warning",
};

const Avatar = ({ name, image: imageSource, size, variant, ringColor = "primary", className, ...props }: AvatarProps) => {
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
		<span
			className={cx(
				avatarVariants({ size, variant, className }),
				variant === "ring" && ringColorClasses[ringColor],
			)}
			{...props}
		>
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
