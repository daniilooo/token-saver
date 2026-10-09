# Git Workflow

| Branch | Papel | Origem | Destino |
|---|---|---|---|
| main | Estável publicada | promoção de release | release sincronizada |
| release | Integração | main no bootstrap | PR para main |
| feature/polish | Primeira entrega | release | PR para release |
| feature/* | Mudanças isoladas | release | PR para release |

Sem push direto em main, force push ou reset destrutivo. Feature usa squash ao integrar; promoção preserva histórico. Tags apontam ao commit estável revisado de main.

Proteções são objetivo operacional; verificar configuração e permissões antes de declarar que existem. CODEOWNERS não substitui ruleset. Não exigir revisão inviável para mantenedor único.

Nesta execução: branches, commits, push da feature e PR draft autorizados; merge/tag/publicação ficam para revisão final. `release` foi criada de `origin/main` no SHA `8aff658f4ed19228ded89f265ac570bb49cde317`; `feature/polish` parte de `release`.

## Proposta administrativa pendente de aprovação

Não houve evidência autenticada de rulesets nesta execução. Para aprovação do mantenedor, propor no GitHub:

- `main`: aceitar pull requests apenas de `release`; exigir o workflow `test` (manifests e matriz), bloquear force push e exclusão; não exigir aprovação adicional enquanto o repositório tiver mantenedor único.
- `release`: aceitar pull requests de `feature/*`; exigir o mesmo workflow, bloquear force push e exclusão; não configurar revisão obrigatória inviável para mantenedor único.

Confirmar a capacidade de restringir a origem da branch no ruleset escolhido antes de alegar que ela é aplicada. `CODEOWNERS` documenta proprietário, mas não ativa revisão obrigatória.
