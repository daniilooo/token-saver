# Release record — 0.1.1

## Scope

Published `0.1.1`: documentation and repository polish only. Package and plugin manifests are aligned at `0.1.1`; no runtime compaction behavior, configuration schema, retention, adapters, metrics, or doctor tooling was changed.

## Draft release notes

- Added English and Brazilian Portuguese README entry points, recovery/bypass guidance, privacy limits, and a reproducible sanitized character-count example.
- Added security policy, contribution guide, issue/PR templates, CODEOWNERS, maintainer instructions, and versioned release records.
- Added manifest consistency validation and CI triggers for `feature/* → release → main`, retaining the existing Node 20/22/24 and Linux/macOS/Windows test matrix.
- Clarified that character reduction is not billed-token, cost, cache, or quota evidence; platform E2E coverage remains pending.

## Release checklist

- [x] Baseline recorded: `8aff658f4ed19228ded89f265ac570bb49cde317`.
- [x] `release` created from current `origin/main`; `feature/polish` created from `release`, both with upstreams.
- [x] Conteúdo candidato validado no commit `790b48045bf49c1ee191120bc9649e3cf3575015` (`docs: prepare 0.1.1 polish release`).
- [x] Feature PR `#1` → `release` aberta para o head `69b938bd2ff1df4536d9ca7c0a754ae5c45b1bfe`: https://github.com/daniilooo/token-saver/pull/1
- [x] Run da PR `37885675384` verde para `afb6e7c1594dd74a382655519a0e9c73f2be5b4a`: manifests e matriz completa aprovados. https://github.com/daniilooo/token-saver/actions/runs/37885675384
- [x] Piloto E2E Linux registrado em `06-Validacao`: ativação, saída longa, linhas de falha, recuperação do original, bypass e estado desativado passaram em sessões distintas. Matriz/plano E2E completo permanece pendente.
- [x] Private vulnerability reporting habilitado e verificado pela API em 2026-10-10 (issue [#6](https://github.com/daniilooo/token-saver/issues/6)).
- [x] Rulesets approved and created: `Protect main` #24823257 and `Protect release` #24823258.
- [x] PR #1 squash-merged em `release` como `4e26eae6689f80b80a7743ed5b5cfb2d7ad79916`; a CI pós-merge `37885997403` passou.
- [x] `release` → `main` foi promovida por merge commit `d9b020b40dd71338db94e218efaa19c618274517` (PR [#3](https://github.com/daniilooo/token-saver/pull/3)); CI `38005816142` aprovada.
- [x] Tag anotada `v0.1.1` criada em `d9b020b40dd71338db94e218efaa19c618274517` e GitHub Release publicada.
- [x] `main` merged back into `release` without rewriting history as `aac42331a28ffb1d759bfacd05ee9a17ce01c2a2`; CI `38006024107` passed.

The stable release SHA is `d9b020b40dd71338db94e218efaa19c618274517`. The validated content commit is recorded above; later documentation-only state commits do not alter the published release.

## GitHub metadata proposal (not applied)

Suggested description: `Local Claude Code plugin that compacts long Bash tool output while retaining the original response locally.`

Suggested topics: `claude-code`, `claude-plugin`, `developer-tools`, `nodejs`, `privacy`, `terminal`, `token-optimization`.

No useful project homepage was found in the tracked repository, so no homepage is proposed. When authenticated GitHub CLI access is available, review before applying:

```bash
gh repo edit daniilooo/token-saver --description "Local Claude Code plugin that compacts long Bash tool output while retaining the original response locally." --add-topic claude-code,claude-plugin,developer-tools,nodejs,privacy,terminal,token-optimization
```
