# Estado do desenvolvimento

Atualizado: 2026-10-09.

Fase: PR aberta; correção de CI Windows/Node 20 em validação.

Repositório: https://github.com/daniilooo/token-saver
Branch atual: `feature/polish`, origem `release`; ambas publicadas com upstream. `release` foi criada de `origin/main` no SHA baseline `8aff658f4ed19228ded89f265ac570bb49cde317`.
SHA baseline: `8aff658f4ed19228ded89f265ac570bb49cde317` (`Update README.md.`, 2026-10-08T15:32:08-03:00).
Mudanças aplicadas: READMEs EN/PT-BR, SECURITY, CONTRIBUTING, CHANGELOG, AGENTS, templates, CODEOWNERS, CI, verificador de manifests, ignore preciso e notas de release. Runtime do plugin não foi modificado.
SHA de conteúdo candidato: `790b48045bf49c1ee191120bc9649e3cf3575015` (`docs: prepare 0.1.1 polish release`). A publicação da feature foi confirmada no head `eb8234aa15257eb9e809891373206064a0a5141c` (`docs: record polish validation`); este próximo registro de estado não altera a implementação validada.
Testes locais: baseline e final `npm test` passaram (6/6) com Node v22.23.3/npm 11.8.0; `npm run verify:manifests` passou para versão 0.1.1; YAML do workflow/formulários passou em PyYAML; 15 arquivos Markdown tiveram links locais válidos; exemplo sanitizado confirmou 11.546 → 93 caracteres e retenção das duas linhas de falha.
Decisões: candidato 0.1.1 permitido pois manifests/tags estavam em 0.1.0/nenhuma tag; segurança privada/rulesets/metadata não foram confirmados porque `gh` não está disponível, portanto somente proposta documentada.
PR: https://github.com/daniilooo/token-saver/pull/1 (`feature/polish` → `release`). A CI remota foi observada: manifests + 8/9 da matriz passaram; Windows/Node 20 falhou pelo glob recebido literalmente no PowerShell, e macOS/Node 20 foi cancelado pelo fail-fast. Correção portátil preparada: `node --test` e `fail-fast: false`; aguardar novo run.
Pendências: CI remota observada no SHA da correção, piloto E2E Claude e aprovações administrativas.

Próximo passo: publicar a correção, observar toda a matriz da PR #1 e registrar o SHA/resultado; não fazer merge, tag ou publicação.

Ao atualizar: registrar fase, branch/SHAs, alterações, validações e limitações, decisões, bloqueios e próximo comando. Ler somente notas relevantes para economizar contexto.
