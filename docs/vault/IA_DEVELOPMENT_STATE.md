# Estado do desenvolvimento

Atualizado: 2026-10-09.

Fase: `v0.1.1` publicada; governança de branches ativa; issue #4 em implementação na `feature/enforce-pr-flow`.

Repositório: https://github.com/daniilooo/token-saver
Branch atual: `feature/enforce-pr-flow`, criada de `origin/release` no SHA `816c7d10db2348e3f0a750f432f62ecdf93aabde`. A PR [#7](https://github.com/daniilooo/token-saver/pull/7) foi integrada por squash em `release` nesse SHA; CI pós-merge `38008821271` aprovada. O diretório local também contém `.obsidian/` não rastreado, preservado e fora desta mudança.
SHA baseline: `8aff658f4ed19228ded89f265ac570bb49cde317` (`main`, 2026-10-08).
Release: PR [#3](https://github.com/daniilooo/token-saver/pull/3) promoveu `release` para `main` por merge commit `d9b020b40dd71338db94e218efaa19c618274517`; a tag anotada e a GitHub Release `v0.1.1` foram publicadas. `main` retornou a `release` pelo merge `aac42331a28ffb1d759bfacd05ee9a17ce01c2a2`, sem reescrita de histórico.
Validações observadas: CI de `main` `38005816142` e sincronização `38006024107` verdes; piloto Claude Code Linux com 2.1.296 registrado em `06-Validacao`; smoke Docker da tag pública passou em Node 22.23.3/npm 10.9.9 e Claude Code 2.1.296 (testes 6/6, manifests, validações dos manifests, marketplace, instalação, ativação, compactação, log e bypass). A PR #7 observou verde no commit `6787e5e` nos runs de push `38008412704` e PR `38008437626`, ambos com `manifests` e matriz completa.
Administração: rulesets ativas `Protect main` (ID 24823257) e `Protect release` (ID 24823258), ambas exigindo PR, os nove checks de matriz e `manifests`, branch atualizada, sem force-push/exclusão e sem aprovação adicional. Rulesets não restringem a origem do PR; a issue [#4](https://github.com/daniilooo/token-saver/issues/4) adiciona o check `branch-flow`, que será incluído nas rulesets somente após CI verde e aprovação administrativa explícita.
Pendências: [#4](https://github.com/daniilooo/token-saver/issues/4) guard de origem de PR; [#5](https://github.com/daniilooo/token-saver/issues/5) matriz E2E e cenários pendentes; [#6](https://github.com/daniilooo/token-saver/issues/6) canal privado de vulnerabilidades. Metadata GitHub continua apenas proposta; não foi aplicada.

Próximo passo: validar, enviar e abrir a PR da `feature/enforce-pr-flow` para `release`; após CI verde, apresentar a inclusão exata de `branch-flow` nas duas rulesets para aprovação administrativa antes de aplicá-la.

Ao atualizar: registrar fase, branch/SHAs, alterações, validações e limitações, decisões, bloqueios e próximo comando. Ler somente notas relevantes para economizar contexto.
