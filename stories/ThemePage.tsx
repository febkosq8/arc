import { useEffect, useState, type ReactNode } from "react";

type ColorToken = {
	name: string;
	variable: string;
	className: string;
	foreground?: string;
	description: string;
};

const surfaces: ColorToken[] = [
	{
		name: "Background",
		variable: "--background",
		className: "bg-background",
		foreground: "--foreground",
		description: "Page and application background",
	},
	{
		name: "Card",
		variable: "--card",
		className: "bg-card",
		foreground: "--card-foreground",
		description: "Raised content surfaces",
	},
	{
		name: "Popover",
		variable: "--popover",
		className: "bg-popover",
		foreground: "--popover-foreground",
		description: "Floating and layered surfaces",
	},
	{
		name: "Muted",
		variable: "--muted",
		className: "bg-muted",
		foreground: "--muted-foreground",
		description: "Quiet secondary surfaces",
	},
];

const semanticColors: ColorToken[] = [
	{
		name: "Primary",
		variable: "--primary",
		className: "bg-primary",
		foreground: "--primary-foreground",
		description: "Brand and prominent actions",
	},
	{
		name: "Secondary",
		variable: "--secondary",
		className: "bg-secondary",
		foreground: "--secondary-foreground",
		description: "Secondary actions and controls",
	},
	{
		name: "Accent",
		variable: "--accent",
		className: "bg-accent",
		foreground: "--accent-foreground",
		description: "Highlighted and selected content",
	},
	{
		name: "Destructive",
		variable: "--destructive",
		className: "bg-destructive",
		foreground: "--destructive-foreground",
		description: "Dangerous or irreversible actions",
	},
	{
		name: "Success",
		variable: "--success",
		className: "bg-success",
		foreground: "--success-foreground",
		description: "Positive outcomes and confirmation",
	},
	{
		name: "Warning",
		variable: "--warning",
		className: "bg-warning",
		foreground: "--warning-foreground",
		description: "Caution and attention states",
	},
];

const structuralColors: ColorToken[] = [
	{ name: "Border", variable: "--border", className: "border-border", description: "Dividers and component outlines" },
	{ name: "Input", variable: "--input", className: "border-input", description: "Input and control outlines" },
	{ name: "Ring", variable: "--ring", className: "ring-ring", description: "Keyboard focus indicator" },
];

const typography = [
	{ name: "Heading 1", className: "typography-heading-1", sample: "Build clear interfaces" },
	{ name: "Heading 2", className: "typography-heading-2", sample: "A section heading" },
	{ name: "Heading 3", className: "typography-heading-3", sample: "A component heading" },
	{ name: "Heading 4", className: "typography-heading-4", sample: "A compact heading" },
	{ name: "Lead", className: "typography-lead", sample: "Supporting text that introduces a section." },
	{
		name: "Paragraph",
		className: "typography-paragraph",
		sample: "Body text uses a comfortable line height for readable content and longer descriptions.",
	},
	{ name: "Large", className: "typography-large", sample: "Emphasized interface text" },
	{ name: "Small", className: "typography-small", sample: "Small supporting label" },
	{ name: "Muted", className: "typography-muted", sample: "Secondary information and metadata" },
];

const spacing = [
	{ name: "1", className: "w-1", value: "0.25rem" },
	{ name: "2", className: "w-2", value: "0.5rem" },
	{ name: "3", className: "w-3", value: "0.75rem" },
	{ name: "4", className: "w-4", value: "1rem" },
	{ name: "6", className: "w-6", value: "1.5rem" },
	{ name: "8", className: "w-8", value: "2rem" },
	{ name: "12", className: "w-12", value: "3rem" },
];

const hslToRgb = (hsl: string) => {
	const values = hsl
		.trim()
		.split(/\s+/)
		.map((value) => Number.parseFloat(value));
	if (values.length !== 3 || values.some((value) => Number.isNaN(value))) {
		return null;
	}

	const [hue, saturation, lightness] = values;
	const s = saturation / 100;
	const l = lightness / 100;
	const chroma = (1 - Math.abs(2 * l - 1)) * s;
	const section = ((hue % 360) + 360) / 60;
	const x = chroma * (1 - Math.abs((section % 2) - 1));
	const match = l - chroma / 2;
	let red = 0;
	let green = 0;
	let blue = 0;

	if (section < 1) [red, green, blue] = [chroma, x, 0];
	else if (section < 2) [red, green, blue] = [x, chroma, 0];
	else if (section < 3) [red, green, blue] = [0, chroma, x];
	else if (section < 4) [red, green, blue] = [0, x, chroma];
	else if (section < 5) [red, green, blue] = [x, 0, chroma];
	else [red, green, blue] = [chroma, 0, x];

	return [red, green, blue].map((channel) => Math.round((channel + match) * 255));
};

const useTokenValue = (variable: string) => {
	const [value, setValue] = useState("");

	useEffect(() => {
		const updateValue = () => setValue(getComputedStyle(document.documentElement).getPropertyValue(variable));
		const observer = new MutationObserver(updateValue);
		updateValue();
		observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "data-theme"] });

		return () => observer.disconnect();
	}, [variable]);

	return value;
};

const TokenSwatch = ({ token }: { token: ColorToken }) => {
	const value = useTokenValue(token.variable);
	const rgb = hslToRgb(value);
	const hex = rgb
		? `#${rgb
				.map((channel) => channel.toString(16).padStart(2, "0"))
				.join("")
				.toUpperCase()}`
		: "—";
	const rgbValue = rgb ? `rgb(${rgb.join(", ")})` : "—";

	return (
		<div className="flex min-w-0 flex-col gap-3 rounded-md border border-border bg-card p-4">
			<div
				className="flex min-h-24 items-center justify-center rounded-md border border-border px-4 text-center text-base font-medium"
				style={{
					backgroundColor: `hsl(var(${token.variable}))`,
					color: token.foreground ? `hsl(var(${token.foreground}))` : "hsl(var(--foreground))",
				}}
			>
				{token.name}
			</div>
			<div className="min-w-0">
				<div className="font-medium text-foreground">{token.name}</div>
				<div className="mt-1 break-words font-mono text-xs text-muted-foreground">{token.variable}</div>
				<CopyClassName className={token.className} />
				<div className="mt-3 space-y-1 font-mono text-xs text-foreground">
					<div className="flex justify-between gap-3">
						<span className="text-muted-foreground">HEX</span>
						<span>{hex}</span>
					</div>
					<div className="flex justify-between gap-3">
						<span className="text-muted-foreground">RGB</span>
						<span>{rgbValue}</span>
					</div>
				</div>
				<p className="mt-2 text-sm text-muted-foreground">{token.description}</p>
			</div>
		</div>
	);
};

const ShowcaseSection = ({
	title,
	description,
	children,
}: {
	title: string;
	description: string;
	children: ReactNode;
}) => (
	<section className="space-y-4">
		<div>
			<h2 className="text-xl font-semibold text-foreground">{title}</h2>
			<p className="mt-1 text-sm text-muted-foreground">{description}</p>
		</div>
		{children}
	</section>
);

const TokenSection = ({ title, description, tokens }: { title: string; description: string; tokens: ColorToken[] }) => (
	<ShowcaseSection title={title} description={description}>
		<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
			{tokens.map((token) => (
				<TokenSwatch key={token.name} token={token} />
			))}
		</div>
	</ShowcaseSection>
);

const CopyClassName = ({ className }: { className: string }) => {
	const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");

	const copyClassName = async () => {
		try {
			await navigator.clipboard.writeText(className);
			setStatus("copied");
		} catch {
			setStatus("error");
		}
	};

	return (
		<div className="flex items-center gap-3">
			<code className="min-w-0 flex-1 break-all rounded-sm bg-muted px-2 py-1 font-mono text-xs text-foreground">{`.${className}`}</code>
			<button
				type="button"
				className="inline-flex h-9 shrink-0 items-center justify-center rounded-md border border-border bg-background px-3 text-sm font-medium text-foreground transition hover:border-primary hover:text-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-opacity-75 focus-visible:outline-none"
				onClick={copyClassName}
				aria-label={`Copy ${className} class name`}
			>
				{status === "copied" ? "Copied" : "Copy"}
			</button>
			{status === "error" && <span className="text-xs text-destructive">Copy failed</span>}
		</div>
	);
};

const ThemeLayout = ({ title, description, children }: { title: string; description: string; children: ReactNode }) => (
	<div className="min-h-full bg-background px-6 py-8 text-foreground sm:px-8">
		<div className="mx-auto max-w-7xl space-y-10">
			<header className="max-w-3xl">
				<p className="text-sm font-medium text-primary">Arc design tokens</p>
				<h1 className="mt-2 text-4xl font-bold tracking-tight">{title}</h1>
				<p className="mt-3 text-lg text-muted-foreground">{description}</p>
			</header>
			{children}
		</div>
	</div>
);

export const ColorTokensPage = () => (
	<ThemeLayout
		title="Colors"
		description="Semantic colors used across Arc components. Compare every token in light and dark mode."
	>
		<TokenSection
			title="Surfaces"
			description="Layered backgrounds establish hierarchy without relying on one-off colors."
			tokens={surfaces}
		/>
		<TokenSection
			title="Semantic colors"
			description="Action, emphasis, and feedback colors include a matching foreground for readable content."
			tokens={semanticColors}
		/>
		<TokenSection
			title="Structure and focus"
			description="Structural tokens keep borders, inputs, and keyboard focus consistent across components."
			tokens={structuralColors}
		/>
	</ThemeLayout>
);

export const TypographyPage = () => (
	<ThemeLayout
		title="Typography"
		description="Reusable type styles and text roles define hierarchy and readable supporting content."
	>
		<ShowcaseSection
			title="Type scale"
			description="Reusable type styles define hierarchy, emphasis, and readable supporting content."
		>
			<div className="divide-y divide-border rounded-md border border-border bg-card">
				{typography.map((item) => (
					<div key={item.name} className="grid gap-3 p-4 sm:grid-cols-[10rem_1fr] sm:items-center">
						<div className="font-mono text-xs text-muted-foreground">{item.name}</div>
						<div className="min-w-0">
							<div className={item.className}>{item.sample}</div>
							<div className="mt-2 max-w-sm">
								<CopyClassName className={item.className} />
							</div>
						</div>
					</div>
				))}
			</div>
		</ShowcaseSection>
		<ShowcaseSection
			title="Text roles"
			description="Text colors communicate hierarchy without overusing the primary brand color."
		>
			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
				{[
					["Foreground", "text-foreground", "Primary content"],
					["Muted foreground", "text-muted-foreground", "Secondary content"],
					["Primary", "text-primary", "Brand emphasis"],
					["Destructive", "text-destructive", "Error and danger"],
				].map(([name, className, sample]) => (
					<div key={name} className="rounded-md border border-border bg-card p-4">
						<div className={`text-lg font-medium ${className}`}>{sample}</div>
						<div className="mt-2 font-mono text-xs text-muted-foreground">{name}</div>
						<div className="mt-3">
							<CopyClassName className={className} />
						</div>
					</div>
				))}
			</div>
		</ShowcaseSection>
	</ThemeLayout>
);

export const FoundationsPage = () => (
	<ThemeLayout
		title="Foundations"
		description="Borders, spacing, elevation, focus, and component hooks for building with Arc."
	>
		<ShowcaseSection
			title="Borders and radius"
			description="Consistent outlines and corner shapes define containers and interactive controls."
		>
			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
				{[
					["Border", "border-border", "border"],
					["Input", "border-input", "border-2"],
					["Foreground", "border-foreground/40", "border"],
					["Primary", "border-primary", "border-2"],
				].map(([name, borderClass, widthClass]) => (
					<div key={name} className="rounded-md bg-card p-4">
						<div
							className={`flex h-20 items-center justify-center rounded-md bg-background ${widthClass} ${borderClass}`}
						>
							{name}
						</div>
						<div className="mt-3 font-mono text-xs text-muted-foreground">{borderClass}</div>
					</div>
				))}
			</div>
			<div className="grid gap-4 sm:grid-cols-3">
				{[
					["Standard radius", "rounded-md", "var(--radius)"],
					["Small radius", "rounded-sm", "0.25rem"],
					["Pill radius", "rounded-full", "9999px"],
				].map(([name, radiusClass, value]) => (
					<div key={name} className="rounded-md border border-border bg-card p-4">
						<div className={`flex h-16 items-center justify-center border border-border bg-muted ${radiusClass}`}>
							{name}
						</div>
						<div className="mt-3 font-mono text-xs text-muted-foreground">{value}</div>
					</div>
				))}
			</div>
		</ShowcaseSection>
		<ShowcaseSection
			title="Spacing"
			description="The spacing scale keeps layouts predictable across components and page sections."
		>
			<div className="rounded-md border border-border bg-card p-4">
				<div className="space-y-3">
					{spacing.map((item) => (
						<div key={item.name} className="flex items-center gap-4">
							<div className="w-12 font-mono text-xs text-muted-foreground">{item.name}</div>
							<div className={`h-4 rounded-sm bg-primary ${item.className}`} />
							<div className="font-mono text-xs text-muted-foreground">{item.value}</div>
						</div>
					))}
				</div>
			</div>
		</ShowcaseSection>
		<ShowcaseSection
			title="Elevation and focus"
			description="Surface elevation and focus treatment provide depth and clear keyboard feedback."
		>
			<div className="grid gap-6 sm:grid-cols-3">
				<div className="rounded-md border border-border bg-card p-5 shadow-sm">
					<div className="font-medium">Card elevation</div>
					<div className="mt-1 text-sm text-muted-foreground">shadow-sm</div>
				</div>
				<div className="rounded-md border border-border bg-popover p-5 shadow-lg">
					<div className="font-medium">Popover elevation</div>
					<div className="mt-1 text-sm text-muted-foreground">shadow-lg</div>
				</div>
				<div
					className="rounded-md border border-border bg-card p-5 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
					tabIndex={0}
				>
					<div className="font-medium">Focus treatment</div>
					<div className="mt-1 text-sm text-muted-foreground">Focus this panel with Tab</div>
				</div>
			</div>
		</ShowcaseSection>
	</ThemeLayout>
);
