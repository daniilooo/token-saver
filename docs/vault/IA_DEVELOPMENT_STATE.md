# Estado do desenvolvimento

Atualizado: 2026-10-09.

Fase: PR aberta, CI verde; aguarda revisão e piloto E2E Claude.

Repositório: https://github.com/daniilooo/token-saver
Branch atual: `feature/polish`, origem `release`; ambas publicadas com upstream. `release` foi criada de `origin/main` no SHA baseline `8aff658f4ed19228ded89f265ac570bb49cde317`.
SHA baseline: `8aff658f4ed19228ded89f265ac570bb49cde317` (`Update README.md.`, 2026-10-08T15:32:08-03:00).
Mudanças aplicadas: READMEs EN/PT-BR, SECURITY, CONTRIBUTING, CHANGELOG, AGENTS, templates, CODEOWNERS, CI, verificador de manifests, ignore preciso e notas de release. Runtime do plugin não foi modificado.
SHA de conteúdo candidato: `790b48045bf49c1ee191120bc9649e3cf3575015` (`docs: prepare 0.1.1 polish release`). A publicação da feature foi confirmada no head `eb8234aa15257eb9e809891373206064a0a5141c` (`docs: record polish validation`); este próximo registro de estado não altera a implementação validada.
Testes locais: baseline e final `npm test` passaram (6/6) com Node v22.23.3/npm 11.8.0; `npm run verify:manifests` passou para versão 0.1.1; YAML do workflow/formulários passou em PyYAML; 15 arquivos Markdown tiveram links locais válidos; exemplo sanitizado confirmou 11.546 → 93 caracteres e retenção das duas linhas de falha.
Decisões: candidato 0.1.1 permitido pois manifests/tags estavam em 0.1.0/nenhuma tag; segurança privada/rulesets/metadata não foram confirmados porque `gh` não está disponível, portanto somente proposta documentada.
PR: https://github.com/daniilooo/token-saver/pull/1 (`feature/polish` → `release`), head de entrega `afb6e7c1594dd74a382655519a0e9c73f2be5b4a`. CI observada e verde: run da PR `37885675384` e run de push `37885672487`; manifests e toda a matriz Node 20/22/24 × Linux/macOS/Windows passaram. A correção foi `node --test` no lugar do glob dependente de shell e `fail-fast: false`.
Pendências: piloto E2E Claude e aprovações administrativas de private reporting/rulesets/metadata; merge, tag e publicação continuam fora desta execução.

Próximo passo: revisar a PR #1, executar/registrar o piloto E2E Claude e então seguir o checklist de promoção; não fazer merge, tag ou publicação nesta execução.

Ao atualizar: registrar fase, branch/SHAs, alterações, validações e limitações, decisões, bloqueios e próximo comando. Ler somente notas relevantes para economizar contexto.
