# Arquitetura

Marketplace → plugin → hook síncrono PostToolUse/Bash → validação → seleção de linhas → persistência → updatedToolOutput.

O CLI compartilha código com o hook. `active` modifica somente `.gitignore` e a configuração local; `off` preserva logs; `stats` agrega arquivos únicos; `install-aliases` cria comandos delegadores sem caminhos absolutos da máquina.

Não executa novamente o comando original. Invoca Git somente para localizar a raiz. Não altera entrada, exit code ou permissões. Preserva campos extras do tool_response na substituição; stdout e stderr são apresentados juntos no excerto, enquanto o log conserva sua separação.

A versão inicial fornece um detector de ferramentas e um filtro compartilhado. Próximas evoluções: registro de adaptadores semânticos com fixtures reais, retenção configurável, detecção mais robusta de comandos compostos e validação integrada com versões específicas do Claude. Adicionar ecossistemas não deve introduzir execução de comandos ou síntese de métricas que não constem na saída.
