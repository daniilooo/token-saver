# Estado do desenvolvimento

Atualizado: 2026-10-09.

Fase: `release` integrada, CI verde e piloto E2E Linux aprovado; aguarda revisão final de release.

Repositório: https://github.com/daniilooo/token-saver
Branch atual: `feature/e2e-validation`, origem `release`, para versionar a evidência do piloto e o ajuste do manifesto. `release` foi criada de `origin/main` no SHA baseline `8aff658f4ed19228ded89f265ac570bb49cde317` e contém o squash `4e26eae6689f80b80a7743ed5b5cfb2d7ad79916` da PR #1.
SHA baseline: `8aff658f4ed19228ded89f265ac570bb49cde317` (`Update README.md.`, 2026-10-08T15:32:08-03:00).
Mudanças aplicadas: READMEs EN/PT-BR, SECURITY, CONTRIBUTING, CHANGELOG, AGENTS, templates, CODEOWNERS, CI, verificador de manifests, ignore preciso e notas de release. Runtime do plugin não foi modificado.
SHA de conteúdo candidato: `790b48045bf49c1ee191120bc9649e3cf3575015` (`docs: prepare 0.1.1 polish release`). A publicação da feature foi confirmada no head `eb8234aa15257eb9e809891373206064a0a5141c` (`docs: record polish validation`); este próximo registro de estado não altera a implementação validada.
Testes locais: baseline e final `npm test` passaram (6/6) com Node v22.23.3/npm 11.8.0; `npm run verify:manifests` passou para versão 0.1.1; YAML do workflow/formulários passou em PyYAML; 15 arquivos Markdown tiveram links locais válidos; exemplo sanitizado confirmou 11.546 → 93 caracteres e retenção das duas linhas de falha.
Decisões: candidato 0.1.1 permitido pois manifests/tags estavam em 0.1.0/nenhuma tag; segurança privada/rulesets/metadata não foram confirmados porque `gh` não está disponível, portanto somente proposta documentada. O marketplace persistente continua em `0.1.0` porque acompanha `main`; o candidato `release` foi validado isoladamente por `--plugin-dir` sem promoção prematura.
PR #1 foi integrada por squash em `release`; CI pós-merge `37885997403` passou. O piloto E2E Linux passou com Claude Code 2.1.296 e está registrado em `06-Validacao`.
Pendências: integrar esta evidência/descrição em `release`, aprovações administrativas de private reporting/rulesets/metadata, e depois PR `release` → `main`; não há evidência E2E completa em Windows/macOS, subagentes ou falha de escrita.

Próximo passo: validar, publicar e integrar `feature/e2e-validation` em `release`; então abrir a PR `release` → `main` somente após a revisão final. Não criar tag ou publicação nesta execução.

Ao atualizar: registrar fase, branch/SHAs, alterações, validações e limitações, decisões, bloqueios e próximo comando. Ler somente notas relevantes para economizar contexto.
