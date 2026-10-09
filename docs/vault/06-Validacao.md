# Validação

## Registro inicial

Baseline em 2026-10-09: SHA `8aff658f4ed19228ded89f265ac570bb49cde317` (`main`/`origin/main`); Node `v22.23.3`, npm `11.8.0`; `npm test` passou com 6 testes, 0 falhas. Não havia tags, `release` ou `feature/polish` remotas antes desta execução. Nenhuma matriz E2E confirmada neste pacote.

Validação de exemplo sanitizado: o comando em ambos os READMEs executou a função atual com entrada sintética de 11.546 caracteres e produziu excerto de 93 caracteres, com `Expected 409` e `BUILD FAILURE`. É uma contagem de caracteres, não uma métrica de tokens, cobrança ou quota.

Validação de manifests: `npm run verify:manifests` passou para `token-saver 0.1.1; Node >=20`.

## CI observada — correção pendente de confirmação

A PR `#1` (`feature/polish` → `release`) e o push do SHA `69b938bd2ff1df4536d9ca7c0a754ae5c45b1bfe` tiveram 8 das 9 combinações da matriz aprovadas, além do job `manifests`. Apenas `windows-latest` / Node 20 falhou; os jobs macOS cancelados eram efeito do `fail-fast` padrão após essa falha. A causa é o glob `tests/*.test.cjs`: PowerShell não o expande e o test runner Node 20 não aceita glob de arquivo como as versões posteriores. A correção troca o script por `node --test`, cuja descoberta recursiva de `*.test.cjs` é documentada para Node 20, e define `fail-fast: false`.

Resultado da correção: o run da PR `37885675384` no SHA `afb6e7c1594dd74a382655519a0e9c73f2be5b4a` foi concluído com sucesso. `manifests` e todas as 9 combinações Node 20/22/24 × Linux/macOS/Windows passaram. O run de push correspondente `37885672487` também passou.

## E2E Claude Code observada — Linux

Em 2026-10-09, o candidato do `release` `4e26eae6689f80b80a7743ed5b5cfb2d7ad79916` foi carregado por sessão com `--plugin-dir` em um projeto temporário ativado. Ambiente: Ubuntu 24.04 (kernel `7.0.0-34-generic`), Node `v22.23.3`, Claude Code `2.1.296`. O carregamento por diretório foi necessário porque o marketplace de usuário acompanha `main` e a instalação persistente ainda é `0.1.0`; o candidato não foi promovido para atualizar artificialmente essa fonte.

- Uma sessão executou uma saída sintética longa (500 linhas de download), com `console.error('fatal: synthetic e2e failure')` e `BUILD FAILURE`. O modelo recebeu `TOKEN SAVER — generic excerpt; status not inferred`, as duas linhas de falha e o caminho do log. O log único reteve o `tool_response` original com 11.542 caracteres e excerto de 215. O cliente retornou o texto de `console.error` consolidado em `stdout` (`stderr` vazio), portanto o comportamento de campo stderr separado não foi confirmado nesse cliente.
- Em uma nova sessão, `TOKEN_SAVER=off` deixou visíveis as 200 linhas sintéticas e ambas as linhas de falha, sem cabeçalho ou caminho de log; a contagem de logs permaneceu 1.
- Após `off`, uma terceira sessão também recebeu a saída original sem cabeçalho/caminho e a contagem de logs permaneceu 1. A configuração persistiu entre sessões até ser desativada.

Este piloto confirma a integração principal em Linux, não uma matriz E2E completa: Windows/macOS, reinício da interface interativa, subagentes, `PostToolUseFailure` e falha real de escrita de log continuam fora da evidência E2E.

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
