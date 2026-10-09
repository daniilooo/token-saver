# Contributing to Token Saver

## Development setup

Use Node.js 20 or newer. The repository has no npm dependencies, so installation is not required for the automated checks.

```bash
npm test
npm run verify:manifests
```

Run a manual Claude Code pilot only with sanitized output, following [docs/MANUAL.md](docs/MANUAL.md). Unit tests do not prove Claude Code E2E behavior or platform compatibility.

## Scope and tests

Preserve fail-open behavior: unknown or malformed input, write failures, structured output, images, interrupts, and explicit bypasses must leave the original result available. Add anonymized fixtures and focused tests for a behavior change. Do not add secrets, real project logs, or credentials to the repository.

This polish cycle intentionally excludes compaction-algorithm changes, unknown-tool behavior, runtime configuration schema, retention, semantic adapters, metrics, and doctor tooling. Propose those separately against the roadmap.

## Commits and pull requests

Use concise Conventional Commit-style subjects, for example `docs: clarify bypass recovery` or `ci: verify manifest versions`. Keep a commit cohesive and include tests or documentation that establish its claim.

The working language for source, commits, issues, and pull requests is English. Brazilian Portuguese user documentation is maintained as an equivalent translation of the English README.

Branch flow:

- `main` is the stable, published line. Do not push directly to it.
- `release` integrates the next version and is created from `main` at bootstrap.
- `feature/*` branches start from `release` and open pull requests to `release`.
- Feature pull requests are squash-merged into `release`; the reviewed `release` branch is promoted to `main` with a merge commit when the host supports it. Then merge `main` back into `release`, without rewriting history.

Open a pull request with the supplied template, link relevant issues, state manual validation limits, and keep both READMEs synchronized when changing user behavior. `CODEOWNERS` assigns review ownership but does not itself require approval; branch protection/rulesets must be enabled separately by a repository administrator.
