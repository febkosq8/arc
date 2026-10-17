# Changelog

Notable changes to Arc are recorded here. Release versions follow [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Changed

- Name the pill-shaped navigation link `PillLink`, following the `<base>-<child>` component naming convention.
- Extend `PillLink` with primary and outline button styles for reusable button-like navigation links.

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
