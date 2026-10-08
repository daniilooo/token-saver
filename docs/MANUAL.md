# Manual de uso e validação no time

1. Instale Node e confirme `node --version` no ambiente do Claude Code.
2. Instale o marketplace/plugin e reinicie o Claude Code.
3. Abra um projeto de teste e execute `/token-saver:active`.
4. Confirme `/token-saver:status` e a entrada `/.token-saver/` no `.gitignore`.
5. Peça ao Claude para executar via Bash: `node -e "console.log('Downloading dependency\\n'.repeat(1000));console.log('BUILD SUCCESS')"`.
6. Confira se o resultado visível ao modelo contém `TOKEN SAVER` e um caminho de log. Confirme o arquivo local e compare `/token-saver:stats`.
7. Teste uma falha longa: peça um Bash que imprima progresso, `fatal: sample failure` no meio e termine com código 1. Dependendo de como a versão do Claude classifica a falha, ela pode chegar por PostToolUse ou PostToolUseFailure. No segundo caso, a saída permanece original.
8. Teste bypass, desligamento e um projeto diferente sem ativação. Não deve haver compactação nesse outro projeto.
9. Repita em cada sistema operacional usado no time, antes de anunciar compatibilidade validada.

Se não compactar: verifique plugin habilitado, runtime no PATH, ativação na raiz certa, tamanho mínimo, condições de preservação e `/hooks`. Use o modo de depuração do Claude Code para erros. Versões que rejeitam `updatedToolOutput` mantêm a saída original; estatísticas locais indicam o excerto proposto e não comprovam sua aceitação pelo cliente.

Para investigar um erro real, peça a leitura de trechos específicos do JSON indicado. Para obter toda a saída, faça a leitura explicitamente e aceite o consumo correspondente.

Para desinstalar, desative no projeto e use `claude plugin uninstall token-saver@danilo-tools`. Os atalhos em `.claude/commands/token-saver-*.md` e os logs permanecem; remova-os manualmente se desejar. Não remova outras configurações do projeto.
