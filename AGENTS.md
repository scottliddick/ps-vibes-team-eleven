# Team Eleven - Vibe Coding Challenge

## Context

This is a one-hour team vibe-coding challenge. Speed matters, but not at the cost of
a completely unmaintainable mess. These rules override the global AGENTS.md where noted.

## What We're Relaxing

- **Skip TDD** - Write tests only for tricky logic, not everything. No time for full coverage.
- **Commit frequency** - Don't worry about atomic commits. Commit when something works, not after every change.
- **Premature abstractions are fine** - If you see a pattern emerging, go ahead and abstract it. We're not maintaining this for years.
- **New tools/libraries are OK** - If a library saves 10 minutes, use it. Don't waste time hand-rolling something that exists.
- **Comments are optional** - The code won't live long enough to need them. Only comment genuinely confusing workarounds.

## What We're NOT Relaxing

- **Code must compile/run** - Broken code wastes more time than it saves. Period.
- **No silent error swallowing** - Still fail fast. Debugging silent failures eats your whole hour.
- **Don't disable linters/formatters** - Just follow them. Fighting tooling is a time sink.
- **No `--no-verify`** - Hooks exist for a reason, even in a challenge.

## Priorities (in order)

1. **Working demo** - Something that runs and can be shown
2. **Core feature completeness** - Nail the main thing before touching extras
3. **Polish** - Only if there's time left

## Approach

- Scaffold fast, iterate on what matters
- Hardcode values that would normally be configurable - extract later if time permits
- Use sensible defaults everywhere instead of building config systems
- Copy-paste is acceptable if it keeps momentum - DRY is a luxury today
- If something takes more than 5 minutes to debug, cut it and find another way

## Tech Decisions

- Pick the stack you know best, not the "right" one
- Prefer batteries-included frameworks (Next.js, Rails, Django, etc.)
- Use hosted/managed services over self-hosted (SQLite over Postgres, etc.)
- Lean on AI-generated boilerplate - that's literally the point

## Agent Skills

Several agent skills are available in `.cursor/skills/`, but for this challenge the only
one we'll use is the **brainstorming** skill — and only up through the "write design doc"
step. Skip the "transition to implementation" step entirely. The design doc output will
be used as manual input to human prompts that drive implementation directly.
