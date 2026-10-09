# Release preparation — 0.1.1 candidate

## Scope

Candidate `0.1.1`: documentation and repository polish only. Package and plugin manifests are aligned at `0.1.1`; no runtime compaction behavior, configuration schema, retention, adapters, metrics, or doctor tooling was changed.

## Draft release notes

- Added English and Brazilian Portuguese README entry points, recovery/bypass guidance, privacy limits, and a reproducible sanitized character-count example.
- Added security policy, contribution guide, issue/PR templates, CODEOWNERS, maintainer instructions, and versioned release records.
- Added manifest consistency validation and CI triggers for `feature/* → release → main`, retaining the existing Node 20/22/24 and Linux/macOS/Windows test matrix.
- Clarified that character reduction is not billed-token, cost, cache, or quota evidence; Claude Code E2E remains pending.

## Release checklist

- [x] Baseline recorded: `8aff658f4ed19228ded89f265ac570bb49cde317`.
- [x] `release` created from current `origin/main`; `feature/polish` created from `release`, both with upstreams.
- [x] Conteúdo candidato validado no commit `790b48045bf49c1ee191120bc9649e3cf3575015` (`docs: prepare 0.1.1 polish release`).
- [ ] Feature PR draft → `release` opened; record URL and delivered head SHA.
- [ ] Observe green `test` workflow for that exact SHA (including the matrix); CI has not yet been observed remotely.
- [ ] Perform and record Claude Code E2E pilot: activation, long output, relevant stderr/failure, bypass, disabled state, separate project, restart, and log-write failure.
- [ ] Confirm/enable private vulnerability reporting and approve repository rulesets.
- [ ] Squash-merge the reviewed feature PR into `release`; validate its post-squash SHA.
- [ ] Open `release` → `main`; promote with merge commit when supported; tag/publish only after final review.
- [ ] Merge `main` back into `release` without rewriting history.

The release candidate SHA is ultimately the PR head or its reviewed squash commit. The validated content commit is recorded above; a later state-only commit may follow without changing the validated implementation. The exact delivered head and remote CI result must be recorded when the PR is opened.

## GitHub metadata proposal (not applied)

Suggested description: `Local Claude Code plugin that compacts long Bash tool output while retaining the original response locally.`

Suggested topics: `claude-code`, `claude-plugin`, `developer-tools`, `nodejs`, `privacy`, `terminal`, `token-optimization`.

No useful project homepage was found in the tracked repository, so no homepage is proposed. When authenticated GitHub CLI access is available, review before applying:

```bash
gh repo edit daniilooo/token-saver --description "Local Claude Code plugin that compacts long Bash tool output while retaining the original response locally." --add-topic claude-code,claude-plugin,developer-tools,nodejs,privacy,terminal,token-optimization
```
