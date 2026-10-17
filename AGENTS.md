# Project Guidelines

## Storybook Controls

- Provide every supported component prop that should be interactive as an explicit default in the story meta `args`, including all variant props, and configure literal options explicitly in `argTypes` when Storybook cannot infer them.
- Reflect every component's default prop values in its Storybook stories.

## Arc Library Standards

### Design tokens and CSS

- Use Tailwind utilities and the shared theme tokens (`background`, `foreground`, `card`, `popover`, `primary`, `secondary`, `muted`, `accent`, `destructive`, `success`, `warning`, `border`, `input`, and `ring`). Never introduce arbitrary colors when an Arc token expresses the intent.
- Keep light and dark themes semantically equivalent. Define shared theme-dependent behavior in [`components/index.css`](components/index.css) with `hsl(var(--token))` or `color-mix`; do not duplicate one-off dark-mode values in individual components.
- Use `@rinzai/zen`'s `cx` to combine base classes, conditional state classes, and caller-provided `className`. Caller classes should remain able to customize layout where the component API permits it.
- Use `arc-*` class hooks only for shared CSS behavior, such as theme-aware hover, highlighted menu items, arrows, or visual effects. Keep component-specific layout in the component's `className`.

### Shape, spacing, and typography

- Use `rounded-md` as the standard interactive and container shape. Preserve an explicit component-level override such as `rounded-(--radius)!` only when the surrounding component intentionally follows the global radius.
- Use transparent borders on components whose hover or highlighted state adds a border, preventing layout shift between states.
- Prefer the existing spacing and typography scale (`p-3`, `px-3 py-2`, `text-base`, `text-xl`, `font-medium`, and `font-bold`) and match neighboring components before adding a new scale.
- Keep reusable controls `inline-flex`, aligned with `items-center`, and use `whitespace-nowrap` when labels must not wrap. Use `w-full` only when the control is intended to fill its parent.

### Interactive states

- **Default:** use `text-foreground` for primary content and `text-muted-foreground` only for secondary or inactive content.
- **Hover:** use `text-primary` with `bg-accent` or the component's shared `arc-*` hover rule. For shared Arc hover treatments, light mode uses a 94% background / 6% foreground mix and dark mode uses an 88% background / 12% primary mix.
- **Active or selected:** expose the state through the appropriate semantic attribute (`aria-pressed`, `aria-selected`, `aria-checked`, or the library primitive's data state) and use `text-primary` unless a component explicitly defines a filled variant.
- **Focus:** remove the browser outline only when retaining `focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-opacity-75` or an equivalent visible keyboard indicator. Never remove focus indication.
- **Disabled:** use native `disabled` semantics where available, preserve the disabled state in the DOM, and make the visual state clearly unavailable without relying on color alone.
- **Menu highlighting:** use `data-highlighted:bg-accent data-highlighted:text-primary` as the baseline. Shared menu CSS supplies theme-aware background and border treatment.

### Component contracts

- Use the correct native element or accessible primitive: buttons for actions, links for navigation, inputs for values, and Base UI state and focus behavior where already adopted.
- Forward supported native props and preserve caller `className`; do not hide event handlers, refs, labels, or state attributes.
- Keep stateful props consistent with accessibility. For example, Arc's [`components/pill.tsx`](components/pill.tsx) maps `active` to `aria-pressed`, and switch components must expose their checked state through the switch primitive.
- Keep icons decorative with `aria-hidden="true"` when adjacent text already communicates their meaning. Provide an accessible name for icon-only controls.
- Preserve transitions and focus behavior when adding variants. Avoid styling that changes geometry between default, hover, active, and focus states.

### Composition and responsive behavior

- Compose from existing Arc components and primitives before creating parallel implementations. Arc's component implementations are the source of truth; do not substitute application-level components from other repositories.
- Keep menu, dropdown, switch, and theme behavior aligned with the existing Base UI composition patterns.
- Make components responsive through the existing Tailwind breakpoints and fluid layout utilities. Do not encode viewport assumptions in component logic when CSS can handle them.
- Keep layout concerns in the consuming component when a reusable component does not own that layout.

### Storybook and verification

- Every exported component should have a Storybook story covering its default appearance and meaningful interactive states, including hover, active/selected, disabled, focus, and dark-theme behavior where applicable.
- Provide every supported interactive prop as an explicit default in story meta `args`, and configure literal options explicitly in `argTypes` when Storybook cannot infer them.
- Reflect every component's default prop values in its Storybook stories. Use stories to verify semantics and visual states, not just screenshots.
- Run the smallest relevant build or Storybook check after component changes; keep exported types and generated declarations buildable.

## Publishing

- Never publish Arc packages automatically. The user manually publishes every new version; do not run `npm publish` or other release commands.
