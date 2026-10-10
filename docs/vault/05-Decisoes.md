# Decisões

## ADR-001 — Fluxo de branches

Decisão do usuário: main, release e feature. main representa versão estável; integração ocorre em release e implementação em feature/*. Promoções via PR.

## ADR-002 — Vault no repositório

Escolha inicial: docs/vault, com Markdown e links internos. Não depende de plugins externos. Notas e decisões versionadas; estado de interface e cache ignorados.

## ADR-003 — Primeiro ciclo: polish

Decisão do usuário: iniciar pelo acabamento profissional. Adaptação semântica, retenção e refatoração são etapas posteriores.

## ADR-004 — Evidência antes de divulgação

A análise anterior orienta investigação. Compatibilidade, segurança, percentuais, branches e releases exigem evidência atual.

## ADR-005 — Release 0.1.1

Sem tags remotas ou locais e com ambos os manifests em `0.1.0`, o próximo patch compatível foi `0.1.1`. Após PRs, CI observada e piloto E2E Linux, a versão foi promovida e publicada na tag `v0.1.1`, que aponta para `d9b020b40dd71338db94e218efaa19c618274517`.

## ADR-006 — Segurança e administração com evidência autenticada

Com `gh` autenticado, as rulesets `Protect main` e `Protect release` foram criadas ativas. Em 2026-10-10, a API confirmou `private-vulnerability-reporting: enabled`; `SECURITY.md` orienta o uso do canal privado nativo e continua proibindo relatos e logs sensíveis em issues públicas. Não foi inventado e-mail de segurança.
