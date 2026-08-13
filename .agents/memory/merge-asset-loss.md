---
name: Merge can delete attached_assets
description: Task-agent merges have deleted attached_assets files; how to detect and restore
---
Task-agent merges (the "Git commit prior to merge" commit) have deleted large parts of `attached_assets/` (generated_images, preview jpgs), breaking Vite `@assets/...` imports and crashing the dev server.

**Why:** the task agent's environment lacked the asset files, so its pre-merge commit recorded them as deletions.

**How to apply:** after any merge, if the workflow fails with "Failed to resolve import @assets/...", restore wholesale with `git checkout <pre-merge-commit>^ -- attached_assets` (avoid per-file loops — Korean filenames get quotepath-mangled), then restart the workflow. Remind the user to commit the restored assets.
