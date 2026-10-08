# Claude Token Saver

Plugin do Claude Code para reduzir saídas extensas de Bash enviadas ao modelo. Ativação explícita por projeto, processamento local, sem chamadas a outra IA e sem dependências npm. Versão inicial **0.1.0**.

## Requisitos e compatibilidade

- Node.js 20 ou superior disponível como `node` no PATH do ambiente que executa os hooks.
- Claude Code atualizado com suporte a `PostToolUse.updatedToolOutput` para ferramentas nativas. A documentação consultada em 08/10/2026 confirma esse contrato; não estabelecemos a versão mínima exata.
- Linux, macOS ou Windows com o ambiente Bash suportado pelo Claude Code. PowerShell nativo não é interceptado nesta versão.
- Git opcional para identificar a raiz do repositório; fora de Git, usa-se o diretório do projeto.

O pacote não inclui Node.js ou Claude Code. Sem um runtime compatível, não há economia. Os testes automatizados verificam o protocolo isoladamente; instalação e economia real precisam ser validadas no Claude Code do time.

## Instalação pelo Git

Após publicar este repositório no seu Git, cada integrante executa, substituindo a URL:

```bash
claude plugin marketplace add https://github.com/daniilooo/token-saver.git
claude plugin install token-saver@danilo-tools
```

Reinicie o Claude Code. Para testar o ZIP sem publicar, extraia-o e execute:

```bash
claude plugin validate /caminho/token-saver
claude plugin validate /caminho/token-saver/plugins/token-saver
claude plugin marketplace add /caminho/token-saver
claude plugin install token-saver@danilo-tools
```

No Windows, use caminhos entre aspas se tiverem espaços. Não há `npm install`.

## Ativar em um projeto

Abra o projeto no Claude Code e execute:

```text
/token-saver:active
```

A skill executa o controle local, cria `.token-saver/config.json` e adiciona `/.token-saver/` ao `.gitignore` da raiz. Isso exclui configuração local, logs e estatísticas derivadas. A ativação persiste entre sessões nesta cópia do projeto, mas não é automaticamente compartilhada com outros clones. Cada integrante ativa onde desejar.

Para habilitar os atalhos sem prefixo, execute **no terminal do projeto**, usando o script da cópia baixada:

```bash
node /caminho/token-saver/plugins/token-saver/scripts/token-saver.cjs install-aliases
```

Reinicie o Claude Code e use:

```text
/token-saver-active
/token-saver-off
/token-saver-stats
/token-saver-status
```

Os atalhos são comandos de projeto que invocam as skills do plugin instalado. Podem ser commitados em `.claude/commands/` para todo o time. Não sobrescrevem comandos existentes. Sem instalar esses atalhos, os comandos oficiais são `/token-saver:active`, `/token-saver:off`, `/token-saver:stats` e `/token-saver:status`.

## Como os tokens são economizados

O Bash termina normalmente. O hook recebe o resultado, salva uma cópia fiel do `tool_response` em `.token-saver/logs/<id>.json` e devolve `updatedToolOutput` com um excerto menor. Quando o Claude Code aceita esse formato, o modelo recebe o excerto em lugar da saída extensa. Isso reduz o texto que pode entrar no contexto das próximas chamadas.

Não é um `clear` do terminal, não apaga mensagens antigas e não recupera tokens já consumidos. O plugin não usa um LLM para resumir. Ele seleciona resultados, avisos, erros e linhas próximas, reduz repetições idênticas selecionadas e remove padrões de download/progresso. Nunca deduz sucesso pela ausência de erros: o resumo é explicitamente identificado como excerto.

Exemplo: milhares de linhas de download seguidas por `BUILD FAILURE` e um erro de asserção passam a um excerto com o erro, o resultado e o caminho para o log. O Claude pode consultar esse arquivo quando precisar de detalhes. Ler o log integral também consome contexto.

`stats` mede caracteres originais e compactados dos resultados realmente substituídos. **Não mede tokens faturados, limites da assinatura, cache ou economia financeira.** A redução do consumo total depende de quanto do contexto vinha de logs e de quanto detalhe precisará ser relido.

## Ferramentas e limites

Reconhece comandos de Java, JS/TS, Python, .NET, Go, Rust, PHP, Ruby, containers, Kubernetes, infraestrutura, cloud, Git e ferramentas de sistema. Nesta versão, o reconhecimento identifica o ecossistema; a seleção usa padrões compartilhados. Não existem ainda parsers semânticos individuais ou totais de testes calculados por stack.

Saídas curtas passam intactas. Diffs, `git show/log`, consultas de banco, JSON válido e opções comuns de JSON também passam intactos. Outros formatos estruturados, comandos compostos e ferramentas desconhecidas exigem cuidado: um filtro heurístico pode omitir informação útil. Use o bypass para resultados que precisam de fidelidade integral.

A cópia original é a saída disponibilizada ao hook pelo Claude Code. Se a ferramenta já tiver truncado o processo ou retornado um identificador de tarefa em background, o plugin não recupera os bytes ausentes. `PostToolUseFailure` e saídas assíncronas de `TaskOutput` não são reescritos nesta versão. Chamadas de Bash de subagentes recebem o mesmo hook quando aplicável ao projeto.

## Configuração e bypass

Edite `.token-saver/config.json`:

```json
{"enabled":true,"level":"aggressive","minChars":4000}
```

Orçamentos aproximados em caracteres do excerto: `normal` 12.000, `aggressive` 6.000, `extreme` 3.000, além do cabeçalho/caminho. São limites de texto, não tokenização exata. A ativação redefine a configuração para os padrões.

Para ignorar a compactação de um Bash:

```bash
TOKEN_SAVER=off mvn test
```

O hook reconhece o marcador no comando; não precisa herdar a variável do processo filho. Também ignora leituras cujo comando contém `.token-saver/logs`. Para desligar persistentemente, use `/token-saver:off`. Não implementamos `raw-next` nesta versão.

## Logs e privacidade

Os arquivos preservam stdout, stderr e metadados presentes no retorno, além do comando. Podem conter credenciais ou dados pessoais. Permanecem locais; não há envio externo pelo plugin. `.gitignore` evita novas inclusões automáticas, mas não remove arquivos que já estejam rastreados. Antes de publicar, verifique `git ls-files .token-saver` e, se necessário, retire-os do índice com `git rm -r --cached .token-saver`.

Arquivos usam identificadores únicos para suportar hooks simultâneos. Estatísticas são calculadas a partir dos arquivos, sem contador global concorrente. Não há retenção automática: remova logs antigos conforme a política do time, fora de execuções em andamento. Remover logs também remove suas estatísticas. Os modos de arquivo restringem acesso em sistemas POSIX; ACLs do Windows dependem do ambiente.

Se configuração, schema ou gravação falhar, o hook não substitui o resultado. Se o excerto for maior que o original, também não substitui. Permissões de execução do Claude Code continuam sob controle dele.

## Desenvolvimento e publicação

```bash
npm test
claude plugin validate .
claude plugin validate ./plugins/token-saver
```

CI incluída para Linux, macOS e Windows, com Node 20/22/24. Veja [manual](docs/MANUAL.md), [arquitetura](docs/ARCHITECTURE.md) e [contribuição](CONTRIBUTING.md)

Licença MIT. Autor: Danilo Franco.

## Referências oficiais

- https://code.claude.com/docs/en/hooks
- https://code.claude.com/docs/en/plugins-reference
- https://code.claude.com/docs/en/plugin-marketplaces
# token-saver
