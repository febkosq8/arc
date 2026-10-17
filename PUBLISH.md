# Publishing Arc

Arc uses [Semantic Versioning](https://semver.org/) (`MAJOR.MINOR.PATCH`):

| Bump  | Use for                          | Example from `0.4.0` |
| ----- | -------------------------------- | -------------------- |
| Patch | Backwards-compatible fixes       | `0.4.1`              |
| Minor | Backwards-compatible features    | `0.5.0`              |
| Major | Breaking API or behavior changes | `1.0.0`              |

Arc is in the `0.x` development series, so the API is not yet considered stable. Clearly document breaking changes.

## Release

Run **Get Commands for Arc release** from VS Code's **Terminal > Run Task** menu to print the release commands. The task reads `package.json`'s `version`, prompting if it is missing, and does not execute Git or npm commands. Review and run the printed commands manually. If npm requires an authenticator code, pass it with `--otp`; if npm opens a browser authentication flow, complete it in the terminal and retry publishing. Prepare the release as described below before running the task. GitHub Release creation remains manual.

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

## Unpublish

Run **Get Commands to Untag Arc release** from VS Code's **Terminal > Run Task** menu to print the local and remote tag deletion commands and the npm unpublish command. Enter the release version when prompted, then review and run the commands manually; this task does not execute them.

To remove a specific release, replace `X.Y.Z` below with its version. Remove the npm package version:

```bash
npm unpublish @febkosq8/arc@X.Y.Z
```

npm restricts unpublishing, so the command may be rejected if the release is not eligible under npm's unpublishing policy. For releases that should remain installable by existing users but no longer be recommended, deprecate the version instead of unpublishing it.

To find the release tag, list local tags and tags on GitHub:

```bash
git tag --list "v*"
git ls-remote --tags --refs origin "v*"
```

Delete the remote tag first, then the local tag. Fetching while the remote tag still exists can recreate the local tag:

```bash
git push origin --delete vX.Y.Z
git tag --delete vX.Y.Z
```

If you created a GitHub Release for this tag, delete it manually from [GitHub Releases](https://github.com/febkosq8/arc/releases); deleting the tag does not remove the release entry.
