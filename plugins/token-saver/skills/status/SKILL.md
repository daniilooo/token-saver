---
name: status
description: Token Saver status for the current project
disable-model-invocation: true
---
Run exactly this Bash command in the current project, then report its result briefly:

```bash
node "${CLAUDE_PLUGIN_ROOT}/scripts/token-saver.cjs" status
```
Do not read full command logs unless needed to investigate a specific issue. Compacted output is an excerpt, never evidence that omitted lines were successful.
