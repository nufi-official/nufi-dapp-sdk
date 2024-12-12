# Sync of Documentation through Github Actions

## Overview

This repository uses GitHub Actions to automatically sync documentation upon merging to the `main` branch. Changes in specific folders trigger actions that copy the contents to designated directories, overriding existing files and deleting files in the destination if they do not exist in the source.

## Trigger Folders and Destinations

The following folders trigger sync actions when they are changed:

- `sso`
- `snap`
- `common`

### Transfer Details

- **sso**: Contents are copied to `[nuficonnect]/integration/instructions`.
- **snap**: Contents are copied to `[snap]/integration/instructions`.
- **common**: Contents are copied to both `[nuficonnect]/integration/common` and `[snap]/integration/common` to maintain relative paths and prepare for use as sub-pages on GitBook. Referencing a single file multiple times in GitBook is not supported (specifically for subpages, although we currently do not require subpages).

## Adding new files

When adding new files, such as those in the common folder, you need to explicitly map the new content in the [nufi/SUMMARY.md](https://github.com/nufi-official/nufi/blob/main/SUMMARY.md) file to make them appear in the GitBook documentation.

### Linking newly added files

When linking newly added files using a relative path (e.g., `[my new file](../common/***.md)`), the link should point to the page in GitBook, not the GitHub repository, and it should work out of the box. However, there are cases where it may not function as expected. In such situations, action is required in the GitBook UI. If you don’t have access, reach out to someone who does. Otherwise, follow these steps:

1. Log in to GitBook.
2. Navigate to the link you need to fix.
3. Select **Edit in Change Request**.
4. Choose the correct page to link.
5. Merge the changes.

These changes will not affect the code in GitHub (no actual file modifications). Instead, they instruct GitBook to treat the link as an internal reference.

## Troubleshooting

### Failed Actions

Each folder has its own action. When a commit changes multiple folders, the `push` commands might run simultaneously, resulting in a reference head change and an unsuccessful commit push. If an action fails, re-run the failed actions. To prevent this, consider committing changes to subfolders separately.

## Example Workflow

Here's a summary of how the sync process works:

1. **Trigger**: Any commit that changes files in `sso`, `snap`, or `common` folders.
2. **Action**: GitHub Actions run, copying the contents of the changed folder(s) to their respective destinations.
3. **Override and Delete**: The action overrides existing files and deletes files in the destination that are not present in the source.
4. **Commit**: The changes are committed to the destination repository.
