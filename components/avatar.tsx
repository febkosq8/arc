import { cx } from "@rinzai/zen";
import { useEffect, useMemo, useState } from "react";

export type AvatarUser = {
	name?: string | null;
	image?: string | null;
};

export interface AvatarProps extends React.ComponentPropsWithoutRef<"span"> {
	user?: AvatarUser | null;
}

const Avatar = ({ user, className, ...props }: AvatarProps) => {
	const [hasImageError, setHasImageError] = useState(false);
	const image = user?.image?.trim();
	const shouldShowImage = !!image && !hasImageError;
	const initials = useMemo(
		() =>
			user?.name
				?.split(" ", 3)
				?.map((word) => word[0])
				?.filter((letter) => /[A-Za-z]/.test(letter))
				?.join("") || "U",
		[user?.name],
	);

	useEffect(() => {
		setHasImageError(false);
	}, [image]);

	return (
		<span
			className={cx(
				"inline-flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted ring-1 ring-border transition-all",
				className,
			)}
			{...props}
		>
			{shouldShowImage ? (
				<img
					src={image}
					alt={user?.name ?? "User avatar"}
					title={user?.name ?? "User"}
					className="h-full w-full object-cover"
					onError={() => setHasImageError(true)}
				/>
			) : (
				<span className="text-base font-medium leading-none text-foreground" title={user?.name ?? "User"}>
					{initials}
				</span>
			)}
		</span>
	);
};

export default Avatar;
