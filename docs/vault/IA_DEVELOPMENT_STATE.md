# Estado do desenvolvimento

Atualizado: 2026-10-09.

Fase: conteúdo de polish validado, commitado e publicado; PR e CI remota pendentes.

Repositório: https://github.com/daniilooo/token-saver
Branch atual: `feature/polish`, origem `release`; ambas publicadas com upstream. `release` foi criada de `origin/main` no SHA baseline `8aff658f4ed19228ded89f265ac570bb49cde317`.
SHA baseline: `8aff658f4ed19228ded89f265ac570bb49cde317` (`Update README.md.`, 2026-10-08T15:32:08-03:00).
Mudanças aplicadas: READMEs EN/PT-BR, SECURITY, CONTRIBUTING, CHANGELOG, AGENTS, templates, CODEOWNERS, CI, verificador de manifests, ignore preciso e notas de release. Runtime do plugin não foi modificado.
SHA de conteúdo candidato: `790b48045bf49c1ee191120bc9649e3cf3575015` (`docs: prepare 0.1.1 polish release`). A publicação da feature foi confirmada no head `eb8234aa15257eb9e809891373206064a0a5141c` (`docs: record polish validation`); este próximo registro de estado não altera a implementação validada.
Testes locais: baseline e final `npm test` passaram (6/6) com Node v22.23.3/npm 11.8.0; `npm run verify:manifests` passou para versão 0.1.1; YAML do workflow/formulários passou em PyYAML; 15 arquivos Markdown tiveram links locais válidos; exemplo sanitizado confirmou 11.546 → 93 caracteres e retenção das duas linhas de falha.
Decisões: candidato 0.1.1 permitido pois manifests/tags estavam em 0.1.0/nenhuma tag; segurança privada/rulesets/metadata não foram confirmados porque `gh` não está disponível, portanto somente proposta documentada.
Pendências: PR draft para release, CI remota observada no SHA entregue, piloto E2E Claude e aprovações administrativas. `gh` não está instalado e não há navegador conectado nesta sessão; comando concreto está em `07-Release-Preparation.md`.

Próximo passo: abrir a PR draft `feature/polish` → `release`, observar CI e registrar a URL/SHA; não fazer merge, tag ou publicação.

Ao atualizar: registrar fase, branch/SHAs, alterações, validações e limitações, decisões, bloqueios e próximo comando. Ler somente notas relevantes para economizar contexto.
