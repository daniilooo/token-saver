# Security Policy

## Reporting a vulnerability

Do not disclose a vulnerability, exploit, credentials, tokens, private logs, or unredacted tool output in a public GitHub issue.

Private vulnerability reporting has **not been confirmed as enabled** for this repository. No private email address is published for this project. The maintainer must enable GitHub's private vulnerability reporting before a public release and then replace this paragraph with the verified private-reporting URL. Until that is done, there is no verified private reporting channel for this repository.

## Attack surface

The plugin runs a synchronous `PostToolUse` hook for the Claude Code `Bash` tool. It accepts the hook event as JSON on standard input, reads a project-local configuration, derives a project root with local `git rev-parse --show-toplevel`, and may write a replacement response to standard output. It does not re-run the Bash command and does not execute command text from the tool response.

When requested, `install-aliases` writes Markdown command files below the target project's `.claude/commands/` directory and refuses to overwrite an existing command. The hook's only child process is `git` invoked with fixed arguments; the inspected implementation makes no network calls at runtime.

## Local data and risks

When compaction occurs, the plugin writes `.token-saver/logs/<timestamp>-<uuid>.json`. Each file contains the command, the original `tool_response` (including stdout, stderr, and supplied metadata), and character counts. Activation writes `.token-saver/config.json`. New config and log files request restrictive POSIX modes (`0600`); the directories request `0700` where the plugin creates them.

Logs are exact diagnostic material, not redacted exports. They can contain secrets, access tokens, personal information, proprietary code/output, and filesystem paths. Windows ACLs, synchronized folders, backup systems, elevated users, and existing files can weaken the practical protection. Review and remove logs under your team's retention policy; never commit or publicly attach them. The plugin intentionally has no automatic retention or secret redaction in this version.

## Operational guidance

- Enable Token Saver only in projects where local log retention is acceptable.
- Use `TOKEN_SAVER=off <command>` for sensitive or fidelity-critical output.
- Inspect a minimal, relevant JSON portion when recovering output.
- Keep `.token-saver/config.json` and `.token-saver/logs/` ignored. If a project has already tracked them, remove them from its index deliberately; do not assume `.gitignore` retroactively untracks files.

This policy describes the code inspected for the `0.1.1` candidate. A Claude Code E2E pilot, security-reporting enablement, and repository ruleset approval remain release gates.
