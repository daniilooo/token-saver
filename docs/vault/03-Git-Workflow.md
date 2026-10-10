# Git Workflow

| Branch | Papel | Origem | Destino |
|---|---|---|---|
| main | Estável publicada | promoção de release | release sincronizada |
| release | Integração | main no bootstrap | PR para main |
| feature/polish | Primeira entrega | release | PR para release |
| feature/* | Mudanças isoladas | release | PR para release |

Sem push direto em main, force push ou reset destrutivo. Feature usa squash ao integrar; promoção preserva histórico. Tags apontam ao commit estável revisado de main.

Proteções são objetivo operacional; verificar configuração e permissões antes de declarar que existem. CODEOWNERS não substitui ruleset. Não exigir revisão inviável para mantenedor único.

`release` foi criada de `origin/main` no SHA `8aff658f4ed19228ded89f265ac570bb49cde317`; `feature/polish` partiu de `release`. A `v0.1.1` foi publicada a partir do merge em `main` `d9b020b40dd71338db94e218efaa19c618274517`, e `main` foi sincronizada de volta em `release` sem reescrita de histórico.

## Proteções administrativas ativas

Em 2026-10-09, a API autenticada confirmou e criou as rulesets ativas:

- [`Protect main`](https://github.com/daniilooo/token-saver/rules/24823257): PR obrigatório, `manifests` e nove checks de matriz obrigatórios e atualizados, bloqueio de force-push e exclusão, zero aprovações requeridas.
- [`Protect release`](https://github.com/daniilooo/token-saver/rules/24823258): mesmas exigências para a branch de integração.

Rulesets nativos não restringem a branch de origem do PR. O check obrigatório `branch-flow`, integrado na PR [#8](https://github.com/daniilooo/token-saver/pull/8), faz essa validação: permite apenas `release` → `main`, `feature/*` → `release` e a sincronização `main` → `release`. `CODEOWNERS` documenta proprietário, mas não ativa revisão obrigatória.
