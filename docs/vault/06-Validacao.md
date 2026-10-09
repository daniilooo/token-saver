# Validação

## Registro inicial

Baseline em 2026-10-09: SHA `8aff658f4ed19228ded89f265ac570bb49cde317` (`main`/`origin/main`); Node `v22.23.3`, npm `11.8.0`; `npm test` passou com 6 testes, 0 falhas. Não havia tags, `release` ou `feature/polish` remotas antes desta execução. Nenhuma matriz E2E confirmada neste pacote.

Validação de exemplo sanitizado: o comando em ambos os READMEs executou a função atual com entrada sintética de 11.546 caracteres e produziu excerto de 93 caracteres, com `Expected 409` e `BUILD FAILURE`. É uma contagem de caracteres, não uma métrica de tokens, cobrança ou quota.

Validação de manifests: `npm run verify:manifests` passou para `token-saver 0.1.1; Node >=20`.

## Evidências exigidas

| Validação | Evidência |
|---|---|
| Testes baseline/final | comando, versão Node, resultado |
| CI | URL do run e SHA |
| Instalação | comando e ambiente testados |
| Versões | manifests e tags inspecionados |
| Docs | links locais e equivalência EN/PT-BR |
| Exemplo de redução | entrada sanitizada, comando e contagens |
| Release | checklist e SHA, publicação ainda pendente |

E2E Claude futuro: ativação, bypass, saída extensa, erros relevantes/stderr, subagente, reinício, isolamento de projeto e falha de gravação; registrar versão Claude e SO. Não marcar como aprovado sem executar.
