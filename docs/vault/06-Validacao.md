# Validação

## Registro inicial

Baseline em 2026-10-09: SHA `8aff658f4ed19228ded89f265ac570bb49cde317` (`main`/`origin/main`); Node `v22.23.3`, npm `11.8.0`; `npm test` passou com 6 testes, 0 falhas. Não havia tags, `release` ou `feature/polish` remotas antes desta execução. Nenhuma matriz E2E confirmada neste pacote.

Validação de exemplo sanitizado: o comando em ambos os READMEs executou a função atual com entrada sintética de 11.546 caracteres e produziu excerto de 93 caracteres, com `Expected 409` e `BUILD FAILURE`. É uma contagem de caracteres, não uma métrica de tokens, cobrança ou quota.

Validação de manifests: `npm run verify:manifests` passou para `token-saver 0.1.1; Node >=20`.

## CI observada — correção confirmada

A PR `#1` (`feature/polish` → `release`) e o push do SHA `69b938bd2ff1df4536d9ca7c0a754ae5c45b1bfe` tiveram 8 das 9 combinações da matriz aprovadas, além do job `manifests`. Apenas `windows-latest` / Node 20 falhou; os jobs macOS cancelados eram efeito do `fail-fast` padrão após essa falha. A causa é o glob `tests/*.test.cjs`: PowerShell não o expande e o test runner Node 20 não aceita glob de arquivo como as versões posteriores. A correção troca o script por `node --test`, cuja descoberta recursiva de `*.test.cjs` é documentada para Node 20, e define `fail-fast: false`.

Resultado da correção: o run da PR `37885675384` no SHA `afb6e7c1594dd74a382655519a0e9c73f2be5b4a` foi concluído com sucesso. `manifests` e todas as 9 combinações Node 20/22/24 × Linux/macOS/Windows passaram. O run de push correspondente `37885672487` também passou.

## E2E Claude Code observada — Linux

Em 2026-10-09, o conteúdo então em `release` `4e26eae6689f80b80a7743ed5b5cfb2d7ad79916` foi carregado por sessão com `--plugin-dir` em um projeto temporário ativado. Ambiente: Ubuntu 24.04 (kernel `7.0.0-34-generic`), Node `v22.23.3`, Claude Code `2.1.296`. Esse conteúdo foi posteriormente promovido para a release `v0.1.1`.

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
| Release | tag `v0.1.1`, GitHub Release e SHA promovido |

E2E Claude futuro: ativação, bypass, saída extensa, erros relevantes/stderr, subagente, reinício, isolamento de projeto e falha de gravação; registrar versão Claude e SO. Não marcar como aprovado sem executar.

## Smoke test de distribuição — Docker

Em 2026-10-09, a imagem ausente `node:22-bookworm-slim` foi baixada com digest `sha256:c3de60bf2f9dd0ac6370e6117950ff62d6e339527e7472301c9c78a017978392` e usada em um contêiner descartável. O teste clonou a tag pública `v0.1.1` no SHA `d9b020b40dd71338db94e218efaa19c618274517`; usou Node `v22.23.3`, npm `10.9.9` e Claude Code `2.1.296`.

- `npm test`: 6/6 aprovados; `npm run verify:manifests`: aprovado.
- `claude plugin validate .` e `claude plugin validate ./plugins/token-saver`: aprovados.
- Marketplace local do checkout da tag e `token-saver@danilo-tools` instalaram com sucesso; o cliente reportou versão `0.1.1` habilitada.
- Projeto sintético: ativação, compactação de 11.546 para 207 caracteres, preservação de `Expected 409` e `BUILD FAILURE`, criação de um log e bypass `TOKEN_SAVER=off` sem log adicional passaram.

O contêiner foi removido e a imagem permaneceu somente como cache local. Isso valida o pacote publicado e o fluxo de instalação sem credenciais, mas não substitui a matriz E2E da issue [#5](https://github.com/daniilooo/token-saver/issues/5).

## E2E expandido — Linux (issue #5)

Em 2026-10-10, o marketplace `danilo-tools` atualizou a instalação de usuário de `token-saver` `0.1.0` para `0.1.1`; o CLI confirmou o plugin habilitado e a versão Claude Code `2.1.296`. Em dois projetos Git temporários, no Ubuntu 24.04 (kernel `7.0.0-34-generic`) e Node `v22.23.3`, sessões novas do Claude Code executaram apenas comandos `node -e` sintéticos autorizados de forma restrita.

- A skill `/token-saver:active` ativou o projeto. Uma nova sessão confirmou a configuração persistida: uma saída de 500 linhas de download recebeu `TOKEN SAVER — generic excerpt; status not inferred`, preservou `Expected 409` e `BUILD FAILURE`, e indicou o log local.
- Um processo de saída `1` com `fatal: synthetic PostToolUseFailure test` retornou `Exit code 1`, preservou a falha e não recebeu `TOKEN SAVER` ou caminho de log. Isso confirma o fail-open esperado para esse evento nesse cliente.
- Com `.token-saver/logs` ocupado deliberadamente por um arquivo regular vazio, a saída longa começou por `Downloading dependency`, preservou `BUILD FAILURE` e não recebeu cabeçalho ou caminho de log. É uma falha de escrita real no hook, observada sem apagar logs anteriores.
- Um subagente chamado pela ferramenta `Task` executou o Bash sintético; seu resultado recebeu o cabeçalho, `SUBAGENT BUILD FAILURE` e o caminho do log. O projeto registrou três compactações, `34.608` caracteres originais e `639` compactados; essa é apenas medição de caracteres.
- Em um comando de sucesso com marcador em `console.error`, o modelo recebeu o marcador e o cabeçalho, mas o log mais recente registrou `stderrChars: 0` e o marcador em `stdout`. Portanto este cliente ainda consolidou stderr em stdout; campos separados não foram observados.

O teste usou sessões novas `--print`, não o reinício da interface TUI interativa. Não há macOS disponível neste ambiente. Existe uma VM Windows desligada (`VCDS-WIN`) aparentemente destinada a outro uso; ela não foi iniciada sem autorização específica. Windows, macOS e reinício TUI continuam pendentes na issue [#5](https://github.com/daniilooo/token-saver/issues/5).
