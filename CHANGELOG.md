# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.8.10] - 2026-11-14

### Added

- Add controlled input and open state, loading indicators, custom selected-value rendering, and an input keydown handler to `Dropdown`.
- Support rich React content for `Select`, `Dropdown`, and `MultiDropdown` labels, extracting text from JSX children and allowing optional `labelTextValue` overrides.
- Add `selectedValueFillsSpace` to `Dropdown` so custom selected values can use the available field width.

### Changed

- Clip overflow in bordered `Input` controls, including textareas, and in `Dropdown` and `MultiDropdown` fields.
- Let rich `Dropdown` and `MultiDropdown` option labels fill the available row width.
- Update the development dependencies Prettier to 3.10.1 and Vite to 8.3.8.

## [0.8.9] - 2026-11-13

### Fixed

- Apply theme-colored thin scrollbars consistently across Firefox and Chromium.

## [0.8.8] - 2026-11-11

### Fixed

- Align the Switch thumb consistently in both states.

## [0.8.7] - 2026-11-09

### Added

- Add `variant` (`pill`, semantic, and outline variants) and `size` options to `Pill`, matching `PillLink`; the default appearance is unchanged.
- Add `Tabs`, `TabsList`, `TabsTab`, and `TabsPanel` components built on Base UI Tabs, with tabs rendered as `Pill` so styling stays in sync.
- Add Storybook coverage for `Tabs`.
- Expose a separate `sortingFn` option on table columns to customize sorting independently of filtering.
- Add the `sortUndefined` table column option to control placement of missing values when sorting.
- Add `DateHandler.formatDuration` for whole-unit durations from milliseconds through years, using 30-day months and 365-day years.

### Fixed

- Show a meaningful search title for table columns with custom filter functions.

## [0.8.6] - 2026-11-07

### Fixed

- Set the global horizontal scrollbar height to match the vertical scrollbar thickness.

## [0.8.5] - 2026-11-07

### Added

- Add editor suggestions for common Luxon date/time formats and formatted-time templates while preserving custom strings.

## [0.8.4] - 2026-11-07

### Added

- Support typed computed Table values through `accessorFn`, requiring an explicit column ID and supporting filtering and sorting.
- Add Storybook coverage for key-based and computed Table accessors.

### Changed

- Move Tailwind processing from `@tailwindcss/postcss` to `@tailwindcss/vite`.
- Update `@rinzai/zen`, Storybook, Tailwind CSS, Vite, and related development tools; use pnpm 12.18.0.

## [0.8.3] - 2026-10-24

### Added

- Add Avatar sizes from `2xl` through `8xl` and a colored ring variant with semantic colors.
- Add `PillLink` semantic and outline variants matching Button's styles.
- Add Tag sizes from `xs` through `3xl`.
- Add Storybook showcases for predefined component sizes, variants, ring colors, and interaction feedback options.

### Changed

- Improve PillLink text contrast across semantic variants.
- Make Switch variant showcases independently interactive.

### Fixed

- Keep LongPressButton and DoubleClickButton feedback rings aligned with their buttons in stretched layouts.

## [0.8.2] - 2026-10-24

### Changed

- Automate npm publishing and GitHub release creation through GitHub Actions, including prerelease dist-tags.

## [0.8.1] - 2026-10-18

### Changed

- Use GridLoader's accessible label as its default hover title, while allowing an explicit title override.

## [0.8.0] - 2026-10-18

### Added

- Add customizable GridLoader symbols and a `shapes` palette to choose which shapes appear in mixed mode.
- Add Storybook examples for GridLoader layouts, colors, symbol-free loading, and DateHandler utilities.
- Add a README-based Storybook introduction with theme-aware documentation.

### Changed

- Synchronize GridLoader symbol, color, and mixed-shape changes with each cell's pulse.
- Move DateHandler and hash-navigation helpers into a dedicated `utilities/` source folder while preserving the package root exports.

## [0.7.0] - 2026-10-18

### Added

- Add GridLoader with configurable grid dimensions, size, animated shapes, and themed loading visuals.
- Add Table with sorting, filtering, and pagination.
- Add LabelField and a success button variant.

### Changed

- Name the pill-shaped navigation link `PillLink`, following the `<base>-<child>` component naming convention.
- Extend `PillLink` with primary and outline button styles for reusable button-like navigation links.
- Add outline button styling and refine shared component styles and PreviewCard open-state behavior.
- Improve table filter typing and pagination separators.

## [0.6.0] - 2026-10-17

### Added

- Add Avatar, Divider, Dropdown, MultiDropdown, ErrorText, LinkPill, Modal, PreviewCard, Select, Tag, and TextLink components.
- Add ButtonGroup, LongPressButton, and DoubleClickButton, including configurable feedback and interaction states.
- Add TypingAnimation and hash-navigation helpers.
- Add button variants and sizes, plus new Avatar sizes and Tag variants.
- Add Storybook examples and documentation for the expanded component library.
- Add a labeled ThemeSwitcher Storybook example.
- Allow Menu dropdown content styling to be customized.

### Changed

- Expand Input with variants, including textarea support, and improve Card, Menu, Switch, and ThemeSwitcher behavior and styling.
- Consolidate Menu and Switch primitives on Base UI, removing Radix UI and Headless UI component dependencies.
- Improve shared theme styles and dark-mode support, and add `arc-` class hooks for shared component styling.
- Configure package exports for the compiled JavaScript, TypeScript declarations, and shared styles, and limit published files to the distribution bundle and stylesheet.
- Run the package build with pnpm before publishing to npm.
- Refine ThemeSwitcher dropdown sizing and option alignment, and add dividers between theme choices.

### Fixed

- Keep a Dropdown selection when the selected item is chosen again.
- Improve button interaction feedback and progress indicator rendering.

### Breaking Changes

- Remove the `TextArea` component; use the textarea variant of `Input` instead.

## [0.3.0] - 2024-12-11

### Added

- Initial tagged component set: Button, Card, Input, Menu, Pill, Switch, TextArea, and ThemeSwitcher.
