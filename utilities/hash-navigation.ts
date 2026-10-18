import { useEffect } from "react";

export type HashNavigationOptions = {
	/** Delay between attempts to find the hash target, in milliseconds. */
	intervalMs?: number;
	/** Maximum number of attempts before giving up. */
	maxAttempts?: number;
	/** Scroll behavior used when the target is found. */
	behavior?: ScrollBehavior;
	/** Scroll alignment used when the target is found. */
	block?: ScrollLogicalPosition;
};

/**
 * Scrolls to the element matching the current URL hash once it exists in the DOM.
 * Retries until the element renders, the hash is cleared or the attempts run out.
 * Returns a cleanup function that cancels any pending attempt.
 */
export function navigateToHashOnLoad({
	intervalMs = 500,
	maxAttempts = 20,
	behavior = "smooth",
	block,
}: HashNavigationOptions = {}): () => void {
	if (typeof window === "undefined") return () => {};

	let attempts = 0;
	const intervalId = setInterval(() => {
		attempts += 1;
		const { hash } = window.location;
		if (!hash || attempts > maxAttempts) {
			clearInterval(intervalId);
			return;
		}
		try {
			const element = document.querySelector(hash);
			if (element) {
				element.scrollIntoView({ behavior, block });
				clearInterval(intervalId);
			}
		} catch (e) {
			console.error(`Invalid hash in URL: ${hash}`, e);
			clearInterval(intervalId);
		}
	}, intervalMs);

	return () => clearInterval(intervalId);
}

/** Runs {@link navigateToHashOnLoad} once on mount. */
export function useHashNavigationOnLoad(options?: HashNavigationOptions) {
	useEffect(() => navigateToHashOnLoad(options), []);
}

export type UpdateHashOnScrollOptions = {
	/** Scrollable element that contains the sections. */
	container: HTMLElement;
	/** Section element ids in display order. */
	sectionIds: string[];
	/** Defaults to true. When false, the first section maps to an empty hash instead of its own (e.g. `#intro`). */
	hashFirstSection?: boolean;
	/** Called on every scroll with the active section index (-1 if none) and the resolved sections. */
	onActiveChange?: (activeIndex: number, sections: HTMLElement[]) => void;
};

/**
 * Keeps the URL hash in sync with the section vertically centered in the container.
 * While an initial hash navigation is still scrolling toward its target, the first section
 * does not clear the hash. Returns a cleanup function that removes the scroll listener.
 */
export function updateHashOnScroll({
	container,
	sectionIds,
	hashFirstSection = true,
	onActiveChange,
}: UpdateHashOnScrollOptions): () => void {
	const sections = sectionIds
		.map((id) => document.getElementById(id))
		.filter((section): section is HTMLElement => section !== null);
	let pendingHash: string | null = window.location.hash.toLowerCase().slice(1) || null;

	const update = () => {
		const bounds = container.getBoundingClientRect();
		const midpoint = bounds.top + bounds.height / 2;
		const activeSection = sections.find((section) => {
			const sectionBounds = section.getBoundingClientRect();
			return sectionBounds.top <= midpoint && sectionBounds.bottom > midpoint;
		});
		const activeIndex = activeSection ? sections.indexOf(activeSection) : -1;
		onActiveChange?.(activeIndex, sections);

		if (!activeSection) return;
		if (pendingHash === activeSection.id.toLowerCase()) pendingHash = null;
		if (activeIndex === 0 && pendingHash) return;

		const nextHash = activeIndex === 0 && !hashFirstSection ? "" : `#${activeSection.id}`;
		if (window.location.hash === nextHash) return;

		window.history.replaceState(
			window.history.state,
			"",
			`${window.location.pathname}${window.location.search}${nextHash}`,
		);
		window.dispatchEvent(new HashChangeEvent("hashchange"));
	};

	update();
	container.addEventListener("scroll", update, { passive: true });
	return () => container.removeEventListener("scroll", update);
}
