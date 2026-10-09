# Validação

## Registro inicial

Baseline em 2026-10-09: SHA `8aff658f4ed19228ded89f265ac570bb49cde317` (`main`/`origin/main`); Node `v22.23.3`, npm `11.8.0`; `npm test` passou com 6 testes, 0 falhas. Não havia tags, `release` ou `feature/polish` remotas antes desta execução. Nenhuma matriz E2E confirmada neste pacote.

Validação de exemplo sanitizado: o comando em ambos os READMEs executou a função atual com entrada sintética de 11.546 caracteres e produziu excerto de 93 caracteres, com `Expected 409` e `BUILD FAILURE`. É uma contagem de caracteres, não uma métrica de tokens, cobrança ou quota.

Validação de manifests: `npm run verify:manifests` passou para `token-saver 0.1.1; Node >=20`.

## CI observada — correção pendente de confirmação

A PR `#1` (`feature/polish` → `release`) e o push do SHA `69b938bd2ff1df4536d9ca7c0a754ae5c45b1bfe` tiveram 8 das 9 combinações da matriz aprovadas, além do job `manifests`. Apenas `windows-latest` / Node 20 falhou; os jobs macOS cancelados eram efeito do `fail-fast` padrão após essa falha. A causa é o glob `tests/*.test.cjs`: PowerShell não o expande e o test runner Node 20 não aceita glob de arquivo como as versões posteriores. A correção troca o script por `node --test`, cuja descoberta recursiva de `*.test.cjs` é documentada para Node 20, e define `fail-fast: false`.

Resultado da correção: o run da PR `37885675384` no SHA `afb6e7c1594dd74a382655519a0e9c73f2be5b4a` foi concluído com sucesso. `manifests` e todas as 9 combinações Node 20/22/24 × Linux/macOS/Windows passaram. O run de push correspondente `37885672487` também passou.

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
