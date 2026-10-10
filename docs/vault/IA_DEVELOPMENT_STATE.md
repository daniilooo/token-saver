# Estado do desenvolvimento

Atualizado: 2026-10-09.

Fase: `v0.1.1` publicada; governança de branches e canal privado de vulnerabilidades ativos; evidência E2E Linux ampliada em `feature/e2e-expanded-validation`.

Repositório: https://github.com/daniilooo/token-saver
Branch atual: `feature/e2e-expanded-validation`, criada de `origin/release` no SHA `4d05c6b63d6720abc2d67307364c76a97cc98ae0`. A PR [#9](https://github.com/daniilooo/token-saver/pull/9) foi integrada por squash nesse SHA; o diretório local também contém `.obsidian/` não rastreado, preservado e fora desta mudança.
SHA baseline: `8aff658f4ed19228ded89f265ac570bb49cde317` (`main`, 2026-10-08).
Release: PR [#3](https://github.com/daniilooo/token-saver/pull/3) promoveu `release` para `main` por merge commit `d9b020b40dd71338db94e218efaa19c618274517`; a tag anotada e a GitHub Release `v0.1.1` foram publicadas. `main` retornou a `release` pelo merge `aac42331a28ffb1d759bfacd05ee9a17ce01c2a2`, sem reescrita de histórico.
Validações observadas: CI de `main` `38005816142` e sincronização `38006024107` verdes; piloto Claude Code Linux com 2.1.296 registrado em `06-Validacao`; smoke Docker da tag pública passou em Node 22.23.3/npm 10.9.9 e Claude Code 2.1.296 (testes 6/6, manifests, validações dos manifests, marketplace, instalação, ativação, compactação, log e bypass). A PR #7 observou verde no commit `6787e5e` nos runs de push `38008412704` e PR `38008437626`, ambos com `manifests` e matriz completa. A PR #8 comprovou `branch-flow` no caminho `feature/*` → `release`; os runs de push/PR `38009030339` e `38009034366` aprovaram o novo check e toda a matriz. Em 2026-10-10, a instalação de usuário foi atualizada para Token Saver `0.1.1` e o E2E Linux ampliado confirmou nova sessão após ativação, `PostToolUseFailure`, falha de escrita de log, subagente e a consolidação de stderr em stdout.
Administração: rulesets ativas `Protect main` (ID 24823257) e `Protect release` (ID 24823258), ambas exigindo PR, os nove checks de matriz, `manifests` e `branch-flow`, branch atualizada, sem force-push/exclusão e sem aprovação adicional. A atualização administrativa foi confirmada em 2026-10-10, sem bypasses. O check obrigatório impõe `release` → `main`, `feature/*` → `release` e `main` → `release`. A API também confirmou `private-vulnerability-reporting: enabled` em 2026-10-10.
Pendências: [#5](https://github.com/daniilooo/token-saver/issues/5) ainda requer macOS, Windows e reinício TUI interativo. Não há macOS disponível; a VM Windows `VCDS-WIN` está desligada e não foi iniciada porque parece alheia ao projeto. As implementações de [#4](https://github.com/daniilooo/token-saver/issues/4) e [#6](https://github.com/daniilooo/token-saver/issues/6) estão concluídas; Metadata GitHub continua apenas proposta e não foi aplicada.

Próximo passo: validar, enviar e abrir PR desta evidência Linux; pedir autorização específica antes de iniciar `VCDS-WIN` para E2E Windows e obter ambiente macOS antes de declarar a matriz completa.

Ao atualizar: registrar fase, branch/SHAs, alterações, validações e limitações, decisões, bloqueios e próximo comando. Ler somente notas relevantes para economizar contexto.
