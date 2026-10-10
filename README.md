# Token Saver

[![CI](https://github.com/daniilooo/token-saver/actions/workflows/test.yml/badge.svg)](https://github.com/daniilooo/token-saver/actions/workflows/test.yml) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE) [![Node.js >= 20](https://img.shields.io/badge/node-%3E%3D20-339933?logo=nodedotjs&logoColor=white)](package.json) [![Plugin version](https://img.shields.io/badge/plugin-0.1.1-blue)](https://github.com/daniilooo/token-saver/releases/tag/v0.1.1)

> Leia em [Português (Brasil)](README.pt-BR.md).

Token Saver is a local Claude Code plugin that can replace long Bash tool output delivered to the model with a smaller, clearly labelled excerpt. Before replacement, it saves the exact tool response locally so you can recover the full output when it matters. It is enabled explicitly, per project.

[`0.1.1`](https://github.com/daniilooo/token-saver/releases/tag/v0.1.1) is the current published release. Automated tests and a Linux Claude Code pilot are recorded in the maintainer vault; they are not a claim of end-to-end validation on every platform or scenario.

## Requirements

- Node.js 20 or later, available as `node` in the environment that runs Claude Code hooks.
- Claude Code with support for `PostToolUse.updatedToolOutput`. This project has not established an exact minimum Claude Code version.
- A Claude Code environment that runs Bash hooks. Native PowerShell output is not intercepted.
- Git is optional; it is used only to find the project root. Without it, the current directory is used.

The plugin has no npm dependencies and does not bundle Node.js or Claude Code.

## Quick start

These installation commands match the tracked marketplace and plugin identifiers. They still require a Claude Code pilot in your own environment.

```bash
claude plugin marketplace add https://github.com/daniilooo/token-saver.git
claude plugin install token-saver@danilo-tools
```

Restart Claude Code, open the project where you want it enabled, and run:

```text
/token-saver:active
/token-saver:status
```

Activation creates `.token-saver/config.json` in that project and adds `/.token-saver/` to that project's `.gitignore`. It is local to that clone; teammates choose whether to activate it in theirs.

To turn it off while retaining existing logs:

```text
/token-saver:off
```

To bypass compaction for one Bash command, put the marker in the command itself:

```bash
TOKEN_SAVER=off mvn test
```

The hook recognizes that marker; it does not need to be inherited by a child process.

## What is preserved, and how to recover it

For an eligible long Bash result, the hook writes the original command and `tool_response` to `.token-saver/logs/<timestamp>-<uuid>.json` before returning an excerpt. The excerpt includes the exact path to that file. Read only the necessary part of the JSON when investigating: reading the whole original output also adds context.

When the configuration is absent or disabled, a response is malformed/interrupted/image data, logging fails, or the excerpt would not be shorter, the hook leaves the original response visible. It also passes through Git diff/show/log commands, database commands, JSON requests, valid JSON stdout, and explicit bypasses.

The plugin does not use an LLM to summarize. It selects result, warning, error, and nearby lines; reduces selected identical repetitions; and omits common download/progress patterns. The excerpt always says that status was not inferred. `stats` reports original and compacted characters for results that the hook actually replaced; it does not report billed tokens, subscription limits, cache use, or financial savings.

## Reproducible, sanitized example

The following command exercises the current `compact` function with synthetic download noise and a failure. It contains no project data and does not measure an API bill:

```bash
node -e "const {compact}=require('./plugins/token-saver/scripts/token-saver.cjs'); const input='Downloading dependency\\n'.repeat(500)+'[ERROR] Expected 409 but was 200\\nBUILD FAILURE'; const output=compact('mvn test',input,'','aggressive'); console.log(JSON.stringify({originalChars:input.length,compactChars:output.length,output},null,2))"
```

In the recorded validation for this release, this input is reduced from 11,546 characters to 93 characters while retaining `Expected 409` and `BUILD FAILURE`. That is a character comparison for this synthetic input only. It is not a measurement of billed tokens, financial savings, cache use, subscription quota, or a guarantee of increased quota.

## Limits

- The Bash command still runs normally; Token Saver does not clear a terminal, restore already consumed context, or infer success from omitted lines.
- Tool recognition identifies an ecosystem, but this version uses a shared heuristic rather than complete per-tool semantic parsers.
- Short output is unchanged. The shared recognizer covers Java, JS/TS, Python, .NET, Go, Rust, PHP, Ruby, containers, Kubernetes, infrastructure, cloud, Git, and system tools; it does not claim complete parsers or test totals for every stack.
- Unknown tools, compound commands, and non-JSON structured output can need the bypass when complete fidelity is important.
- The hook sees only the response made available by Claude Code. It cannot restore output already truncated by the client or recover asynchronous `TaskOutput` / `PostToolUseFailure` results.
- Automated tests cover the protocol in isolation. A Linux Claude Code E2E pilot is recorded in the maintainer vault; platform-specific confirmation remains pending.

## Privacy and local data

The plugin makes no network calls at runtime. It invokes local `git rev-parse --show-toplevel` only to locate the project root. Original logs can contain command text, credentials, access tokens, personal data, or proprietary output; they are not redacted automatically. They are created locally with restrictive POSIX modes where supported, but Windows ACL behavior and backups are environment-dependent.

Keep `.token-saver/` out of version control, remove logs according to your team's policy, and never attach unreviewed log files to an issue. See [SECURITY.md](SECURITY.md) for the attack surface and reporting status.

Logs use unique names so concurrent hooks do not share a file. There is no automatic retention; deleting a log also removes it from later `stats` aggregation. `.gitignore` prevents new additions but does not untrack an existing file—check `git ls-files .token-saver` before publishing a project.

## Configuration

Activation writes this local default configuration (activating again resets it):

```json
{"enabled":true,"level":"aggressive","minChars":4000}
```

Approximate excerpt text budgets are 12,000 characters for `normal`, 6,000 for `aggressive`, and 3,000 for `extreme`, plus the header/path. They are character budgets, not exact tokenization. The hook also bypasses a command that reads `.token-saver/logs`; `raw-next` is not implemented.

## Optional project aliases

The official skill commands above need no aliases. To create project-local shortcut commands, from the target project run the script from your installed checkout:

```bash
node /path/to/token-saver/plugins/token-saver/scripts/token-saver.cjs install-aliases
```

Restart Claude Code, then use `/token-saver-active`, `/token-saver-off`, `/token-saver-stats`, or `/token-saver-status`. Existing commands are never overwritten. These aliases are created in `.claude/commands/` and may be committed only if that is your project's intended policy.

## Development

```bash
npm test
npm run verify:manifests
```

If the Claude CLI is installed, the existing manual validation commands are:

```bash
claude plugin validate .
claude plugin validate ./plugins/token-saver
```

For a manual Claude Code pilot, follow the [team manual](docs/MANUAL.md). Read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request. Architecture is documented in [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md); the versioned maintainer record lives in [docs/vault](docs/vault/00-Home.md).

## License

[MIT](LICENSE) © 2026 Danilo Franco.

## Official references

- https://code.claude.com/docs/en/hooks
- https://code.claude.com/docs/en/plugins-reference
- https://code.claude.com/docs/en/plugin-marketplaces
