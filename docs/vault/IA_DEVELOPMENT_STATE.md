# Estado do desenvolvimento

Atualizado: 2026-10-09.

Fase: `v0.1.1` publicada; governança de branches ativa; documentação pós-release em `feature/post-release-operations` para PR contra `release`.

Repositório: https://github.com/daniilooo/token-saver
Branch atual: `feature/post-release-operations`, criada de `origin/release` no SHA `aac42331a28ffb1d759bfacd05ee9a17ce01c2a2`. O commit de documentação `6787e5ee7b379221602001a96611bd7bc495b93b` foi enviado e está na PR draft [#7](https://github.com/daniilooo/token-saver/pull/7) para `release`. O diretório local também contém `.obsidian/` não rastreado, preservado e fora desta mudança.
SHA baseline: `8aff658f4ed19228ded89f265ac570bb49cde317` (`main`, 2026-10-08).
Release: PR [#3](https://github.com/daniilooo/token-saver/pull/3) promoveu `release` para `main` por merge commit `d9b020b40dd71338db94e218efaa19c618274517`; a tag anotada e a GitHub Release `v0.1.1` foram publicadas. `main` retornou a `release` pelo merge `aac42331a28ffb1d759bfacd05ee9a17ce01c2a2`, sem reescrita de histórico.
Validações observadas: CI de `main` `38005816142` e sincronização `38006024107` verdes; piloto Claude Code Linux com 2.1.296 registrado em `06-Validacao`; smoke Docker da tag pública passou em Node 22.23.3/npm 10.9.9 e Claude Code 2.1.296 (testes 6/6, manifests, validações dos manifests, marketplace, instalação, ativação, compactação, log e bypass). A PR #7 observou verde no commit `6787e5e` nos runs de push `38008412704` e PR `38008437626`, ambos com `manifests` e matriz completa.
Administração: rulesets ativas `Protect main` (ID 24823257) e `Protect release` (ID 24823258), ambas exigindo PR, os nove checks de matriz e `manifests`, branch atualizada, sem force-push/exclusão e sem aprovação adicional. Rulesets não restringem a origem do PR; isso está rastreado na issue [#4](https://github.com/daniilooo/token-saver/issues/4).
Pendências: [#4](https://github.com/daniilooo/token-saver/issues/4) guard de origem de PR; [#5](https://github.com/daniilooo/token-saver/issues/5) matriz E2E e cenários pendentes; [#6](https://github.com/daniilooo/token-saver/issues/6) canal privado de vulnerabilidades. Metadata GitHub continua apenas proposta; não foi aplicada.

Próximo passo: a CI do commit de estado atual deve passar na PR #7; então revisar a PR e removê-la de draft antes do merge por squash em `release`. Depois tratar a issue #4 antes da próxima promoção.

Ao atualizar: registrar fase, branch/SHAs, alterações, validações e limitações, decisões, bloqueios e próximo comando. Ler somente notas relevantes para economizar contexto.
