import type { Meta, StoryObj } from "@storybook/react-vite";
import { useEffect, useState } from "react";
import { Button, navigateToHashOnLoad } from "../components";

type NavigateToHashOnLoadStoryArgs = {
	intervalMs: number;
	maxAttempts: number;
	behavior: ScrollBehavior;
	block: ScrollLogicalPosition;
};

const sectionIds = ["intro", "about", "skills", "projects", "blog", "testimonials", "contact"];

const meta = {
	title: "Utilities/navigateToHashOnLoad",
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component:
					"Scrolls to the element matching the URL hash once it appears after the page loads, retrying until found.",
			},
		},
	},
	argTypes: {
		intervalMs: {
			control: { type: "number", min: 50, step: 50 },
			description: "Delay between attempts to find the hash target, in milliseconds.",
			table: { type: { summary: "number" }, defaultValue: { summary: "500" } },
		},
		maxAttempts: {
			control: { type: "number", min: 1 },
			description: "Maximum number of attempts before giving up.",
			table: { type: { summary: "number" }, defaultValue: { summary: "20" } },
		},
		behavior: {
			control: "inline-radio",
			options: ["auto", "instant", "smooth"],
			description: "Scroll behavior used when the target is found.",
			table: { type: { summary: "ScrollBehavior" }, defaultValue: { summary: "smooth" } },
		},
		block: {
			control: "inline-radio",
			options: ["start", "center", "end", "nearest"],
			description: "Scroll alignment used when the target is found.",
			table: { type: { summary: "ScrollLogicalPosition" } },
		},
	},
	args: {
		intervalMs: 500,
		maxAttempts: 20,
		behavior: "smooth",
		block: "start",
	},
} satisfies Meta<NavigateToHashOnLoadStoryArgs>;

export default meta;
type Story = StoryObj<NavigateToHashOnLoadStoryArgs>;

export const Default: Story = {
	render: ({ intervalMs, maxAttempts, behavior, block }) => {
		const [hash, setHash] = useState(window.location.hash);

		useEffect(() => {
			const onHashChange = () => setHash(window.location.hash);
			window.addEventListener("hashchange", onHashChange);
			return () => window.removeEventListener("hashchange", onHashChange);
		}, []);

		useEffect(
			() => navigateToHashOnLoad({ intervalMs, maxAttempts, behavior, block }),
			[intervalMs, maxAttempts, behavior, block],
		);

		const simulateLoad = (id: string) => {
			window.history.replaceState(
				window.history.state,
				"",
				`${window.location.pathname}${window.location.search}#${id}`,
			);
			setHash(window.location.hash);
			navigateToHashOnLoad({ intervalMs, maxAttempts, behavior, block });
		};

		return (
			<div className="flex w-full min-w-0 flex-col gap-3">
				<div className="flex flex-wrap items-center gap-3">
					{sectionIds.map((id) => (
						<Button key={id} variant="outline-primary" onClick={() => simulateLoad(id)}>
							Load with #{id}
						</Button>
					))}
				</div>
				<p className="text-sm text-muted-foreground">
					URL hash: <span className="text-foreground">{hash || "(empty)"}</span>
				</p>
				<div className="h-64 overflow-y-auto rounded-md border border-border">
					{sectionIds.map((id) => (
						<section
							key={id}
							id={id}
							className="flex h-64 items-center justify-center border-b border-border text-xl font-bold last:border-b-0"
						>
							{id}
						</section>
					))}
				</div>
			</div>
		);
	},
};
