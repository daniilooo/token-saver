# Maintainer instructions

## Scope

Use `docs/vault/IA_DEVELOPMENT_STATE.md` as the resumable state and `docs/vault/` as the versioned decision record. User-facing behavior belongs in `README.md`, `README.pt-BR.md`, and `docs/`. Do not add Obsidian workspace/cache/trash files or Token Saver local logs.

The current polish cycle excludes changes to the compaction algorithm, unknown-tool behavior, runtime configuration schema, retention, semantic adapters, metrics, and doctor tooling.

## Git flow

`main` is the stable published line; `release` integrates the next version; `feature/*` branches start from `release` and target it by PR. Squash feature PRs into `release`; promote `release` to `main` by merge commit where supported; then merge `main` back into `release` without rewriting history. Never force-push, reset destructively, or push directly to `main`.

`CODEOWNERS` records ownership but does not enforce approval. Rulesets and private vulnerability reporting are administrative settings: document a proposal and confirmed state, but do not claim they are enabled without evidence.

## Verified commands

```bash
npm test
npm run verify:manifests
```

Read [the vault home](docs/vault/00-Home.md), [Git workflow](docs/vault/03-Git-Workflow.md), [validation record](docs/vault/06-Validacao.md), and [release preparation](docs/vault/07-Release-Preparation.md) before release-facing work.
