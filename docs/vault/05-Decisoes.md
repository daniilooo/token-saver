# Decisões

## ADR-001 — Fluxo de branches

Decisão do usuário: main, release e feature. main representa versão estável; integração ocorre em release e implementação em feature/*. Promoções via PR.

## ADR-002 — Vault no repositório

Escolha inicial: docs/vault, com Markdown e links internos. Não depende de plugins externos. Notas e decisões versionadas; estado de interface e cache ignorados.

## ADR-003 — Primeiro ciclo: polish

Decisão do usuário: iniciar pelo acabamento profissional. Adaptação semântica, retenção e refatoração são etapas posteriores.

## ADR-004 — Evidência antes de divulgação

A análise anterior orienta investigação. Compatibilidade, segurança, percentuais, branches e releases exigem evidência atual.

## ADR-005 — Candidato 0.1.1

Sem tags remotas ou locais e com ambos os manifests em `0.1.0`, o próximo patch compatível é `0.1.1`. O número identifica um candidato preparado, não uma release publicada. A promoção só ocorre após PR, CI observada no SHA entregue e piloto E2E registrado.

## ADR-006 — Segurança e administração sem evidência autenticada

O ambiente não tinha `gh` disponível para confirmar private vulnerability reporting, metadata ou rulesets. Em vez de inventar uma caixa de e-mail, `SECURITY.md` registra que não há canal privado confirmado e exige habilitação antes da publicação. As configurações propostas ficam no vault para aprovação explícita; não são declaradas ativas.
