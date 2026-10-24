# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
