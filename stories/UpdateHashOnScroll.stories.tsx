import type { Meta, StoryObj } from "@storybook/react-vite";
import { useEffect, useRef, useState } from "react";
import { updateHashOnScroll } from "../components";

type UpdateHashOnScrollStoryArgs = {
	sectionIds: string[];
	hashFirstSection: boolean;
};

const meta = {
	title: "Utilities/updateHashOnScroll",
	tags: ["autodocs"],
	argTypes: {
		sectionIds: {
			control: "object",
			description: "Section element ids in display order.",
			table: { type: { summary: "string[]" } },
		},
		hashFirstSection: {
			control: "boolean",
			description: "Gives the first section its own hash (e.g. #intro). When off, the first section clears the hash.",
			table: { type: { summary: "boolean" }, defaultValue: { summary: "true" } },
		},
	},
	args: {
		sectionIds: ["intro", "about", "skills", "projects", "blog", "testimonials", "contact"],
		hashFirstSection: true,
	},
} satisfies Meta<UpdateHashOnScrollStoryArgs>;

export default meta;
type Story = StoryObj<UpdateHashOnScrollStoryArgs>;

export const Default: Story = {
	render: ({ sectionIds, hashFirstSection }) => {
		const containerRef = useRef<HTMLDivElement>(null);
		const [activeId, setActiveId] = useState("none");
		const [hash, setHash] = useState(window.location.hash);

		useEffect(() => {
			const container = containerRef.current;
			if (!container) return;
			const onHashChange = () => setHash(window.location.hash);
			window.addEventListener("hashchange", onHashChange);
			const stop = updateHashOnScroll({
				container,
				sectionIds,
				hashFirstSection,
				onActiveChange: (index) => setActiveId(sectionIds[index] ?? "none"),
			});
			return () => {
				window.removeEventListener("hashchange", onHashChange);
				stop();
			};
		}, [sectionIds, hashFirstSection]);

		return (
			<div className="flex w-full min-w-0 flex-col gap-3">
				<p className="text-sm text-muted-foreground">
					Active section: <span className="text-foreground">{activeId}</span> · URL hash:{" "}
					<span className="text-foreground">{hash || "(empty)"}</span>
				</p>
				<div ref={containerRef} className="h-64 overflow-y-auto rounded-md border border-border">
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
