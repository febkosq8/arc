# Publishing Arc

Arc uses [Semantic Versioning](https://semver.org/) (`MAJOR.MINOR.PATCH`):

| Bump  | Use for                          | Example from `0.4.0` |
| ----- | -------------------------------- | -------------------- |
| Patch | Backwards-compatible fixes       | `0.4.1`              |
| Minor | Backwards-compatible features    | `0.5.0`              |
| Major | Breaking API or behavior changes | `1.0.0`              |

Arc is in the `0.x` development series, so the API is not yet considered stable. Clearly document breaking changes.

## Release

You can run **Publish Arc release** from VS Code's **Terminal > Run Task** menu to push the current branch and version tag, then publish to npm. The task uses `package.json`'s `version`; if it is missing, it prompts for one. It checks the remote tag and npm version before making changes. If a local tag already exists, it reuses it when it points to the current release commit; otherwise, it retargets it locally and restores the original tag if a later step fails. If a later step fails, it also attempts to remove a remote tag created by the task and restore the branch only if the remote branch has not changed since the task pushed it. If npm publication may have completed, it attempts to unpublish that version; npm may reject the unpublish, in which case the task reports incomplete rollback. Prepare the release as described below before running the task. GitHub Release creation remains manual.

1. Choose the version and update `version` in `package.json`. Finalize the matching dated section in [`CHANGELOG.md`](./CHANGELOG.md), then verify the build:

   ```bash
   pnpm run build
   ```

2. Commit the release:

   ```bash
   git add package.json CHANGELOG.md
   git commit -m "chore: release vX.Y.Z"
   ```

3. Tag the commit and push the branch and tag to GitHub:

   ```bash
   git tag -a vX.Y.Z -m "vX.Y.Z"
   git push
   git push origin vX.Y.Z
   ```

4. Publish to npm:

   ```bash
   pnpm run push-npm
   ```

   This runs `npm publish --access public`; npm runs the `prepublishOnly` build automatically. npm authentication and permissions are checked during publishing, so no separate `npm whoami` step is needed.

5. On [GitHub Releases](https://github.com/febkosq8/arc/releases), create a release from the `vX.Y.Z` tag and use the matching changelog entry as its notes.

If publishing fails because the version already exists, increment the patch version and prepare a new release; published npm versions cannot be reused.
