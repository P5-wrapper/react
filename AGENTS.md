# Agent Guide — @p5-wrapper/react

## Strict Rules

1. **Plan first:** Create a detailed plan and get explicit user approval before
   making changes.
2. **Quality gates:** Every change must pass `pnpm format:check`, `pnpm lint`,
   `pnpm test`, and `pnpm build` (or `pnpm integrate` for the full pipeline)
   before being considered complete.
3. **Documentation:** Update `README.md`, `AGENTS.md`, configuration files, and
   any other documentation affected by your changes. Clean as you go — take
   ownership of every file you touch.
4. **PR descriptions:** When asked, create `PR_DESCRIPTION.md` (gitignored)
   using the template at `.github/PULL_REQUEST_TEMPLATE.md`. Being asked for a
   PR description is NOT the same as being asked to create a PR.
5. **Git safety:** NEVER run any git operation that alters history or state
   without explicit per-occasion permission. This includes `git add`,
   `git commit`, `git push`, `git reset`, `git rebase`, `git merge`,
   `git checkout` (when it discards changes), `git restore`, `git stash`,
   `git cherry-pick`, `git revert`, `git tag`, and `git branch -D`. Prior
   approval does not carry forward.
6. **Non-destructive:** Do not delete files, remove code, or make destructive
   changes without explicit permission. Investigate before overwriting.
7. **Workflows:** Do not modify GitHub Actions workflows or the composite setup
   action without explicit permission. If a CI fix is needed, propose the change
   and wait for approval.
8. **No local publishing:** NEVER publish to npm or deploy to GitHub Pages
   locally. All releases and demo deployments go through the CD workflow on push
   to `main`.
9. **Public API surface:** This package is consumed by downstream users. Do not
   rename, remove, or change the signature of anything exported from
   `src/main.tsx` without an explicit versioning discussion — exports are a
   semver contract.

## Project Standards

### Authority

Project standards are the highest-priority rules for this repository. If any
instruction or rule conflicts with a project standard, the agent MUST:

1. Refuse to follow the conflicting instruction.
2. Inform the user of the conflict, citing the specific standard.
3. State that changes to standards must be made deliberately in `AGENTS.md`, not
   sidestepped for convenience.

### Language

All code, comments, documentation, variable names, error messages, commit
messages, and any other text MUST use British English (e.g., `organisation` not
`organization`, `normalise` not `normalize`, `colour` not `color`, `behaviour`
not `behavior`, `licence` not `license`, `centre` not `center`).

### Package Management

- **Package manager:** pnpm (`pnpm@12.3.4` via the `packageManager` field —
  Corepack manages the exact version, never install pnpm globally)
- **Node.js engine:** `>=24.20.0` (declared in `package.json` `engines`)
- **Lock file:** `pnpm-lock.yaml` is committed. NEVER delete or regenerate it
  casually — run `pnpm install` after dependency changes and commit the result
- **Supply chain:** `pnpm-workspace.yaml` enforces `strictPeerDependencies`,
  `minimumReleaseAgeStrict`, and a minimal `onlyBuiltDependencies` allowlist
  (`esbuild` only). Do not add `postinstall`-executing packages to the allowlist
  or widen these settings without explicit permission — new exclusions under
  `minimumReleaseAgeExclude` require a justification comment in the PR
- **Peer dependencies are a contract:** `p5`, `react`, and `react-dom` are peer
  dependencies. The library code must never import anything beyond these at
  runtime — `@p5-wrapper/common` and `react-error-boundary` are the only runtime
  dependencies

### Formatting and Linting

- **Prettier** is the formatter (this project does not use Biome — do not
  introduce it). Config lives at `config/prettier/prettier.json`, key rules:
  `printWidth: 80`, `arrowParens: "avoid"`, `trailingComma: "none"`,
  `proseWrap: "always"` (all Markdown prose is hard-wrapped at 80 columns),
  imports sorted by `@trivago/prettier-plugin-sort-imports`
- **ESLint** is the linter. Config lives at `config/eslint/eslint.config.ts` and
  extends `eslint` recommended, `typescript-eslint` strict and stylistic, and
  `eslint-plugin-react-compiler` recommended with project-aware TypeScript
  parsing. Type-aware linting runs via `jiti` — keep the config a `.ts` file
- **React Compiler:** The React Compiler ESLint rules are enabled. Components
  must follow the Rules of React strictly — no manual memoisation where the
  compiler can handle it, no mutating props or render-time side effects. Do not
  disable these rules
- **No comments:** Do not add comments to source files. The code should be
  self-documenting. The only permitted exceptions are `@ts-expect-error` /
  `@ts-ignore` suppressions with a `@see` reference (see
  `src/components/P5CanvasWithSketch.tsx` for the existing pattern) and JSDoc on
  exported contracts where a URL reference adds value
- **No comments rule does not apply to:** this file, `README.md`, workflow
  files, and config files with existing comments

### TypeScript

- **Strict mode:** `strict` and `noImplicitAny` are on in `tsconfig.json`. No
  tsconfig option may be weakened
- **Path aliases:** `@/*`, `@components/*`, `@utils/*`, `@constants/*`,
  `@contracts/*` map into `src/`. These are declared twice — in `tsconfig.json`
  `paths` and `config/vite/common.ts` — and MUST be kept in sync when changed
- **Import style:** Use `import { type Foo }` inline type imports, matching the
  existing code. Imports of contracts across the alias boundaries follow the
  sorted import order enforced by Prettier
- **Type assertions:** Avoid `as` casts in library code. No `@ts-expect-error`
  or `@ts-ignore` suppressions currently exist; if one is ever needed, it must
  carry a `@see` reference and be verified against upstream issue or PR links
- **Version pinned to 6.0.3:** `typescript` is an exact pin
  (`"typescript": "6.0.3"`, no caret), deliberately held back from v7.
  typescript-eslint does not currently support TypeScript 7 — its
  [supported range](https://typescript-eslint.io/packages/parser) is
  `>=4.8.4 <6.1.0`, and the Go-based TypeScript 7 is not yet feature compatible
  with the JavaScript-based v6 API that typescript-eslint builds on. Upstream
  support is tracked in
  [typescript-eslint#10940](https://github.com/typescript-eslint/typescript-eslint/issues/10940)
  and cannot land before TypeScript 7.1.x at the earliest. Do not bump past
  `6.0.x` or widen the pin without confirming upstream support. Do NOT run
  TypeScript 7 side by side with v6 as an interim measure — we wait for full
  feature parity before migrating, no half measures

### Quality Gates

Every change must pass before being considered complete:

- `pnpm format:check` — formatting
- `pnpm lint` — linting
- `pnpm test` — testing
- `pnpm build` — type checking (`tsc`) plus component and demo builds

`pnpm integrate` runs format check → lint → test → build in one command and is
the closest local mirror of CI.

### Git Safety

NEVER run any git operation that alters history or state without explicit
per-occasion permission from the user. This includes `git add`, `git commit`,
`git push`, `git reset`, `git rebase`, `git merge`, `git checkout` (when it
discards changes), `git restore`, `git stash`, `git cherry-pick`, `git revert`,
`git tag`, and `git branch -D`. Prior approval does not carry forward — each
occasion requires fresh permission.

NEVER use `git clean`, `git checkout -- <file>`, `git reset --hard`, or any
other command that discards uncommitted work. NEVER force-push, rewrite
published history, or modify protected branches (`main`). Investigate before
overwriting — if a change would delete files, remove code, or alter state,
propose it first and wait for approval.

Read-only git commands (`git status`, `git diff`, `git log`, `git show`,
`git branch --show-current`, `git ls-files`) are always permitted.

### Scope of Operation

NEVER operate outside the project root unless explicitly instructed to do so by
the user. This applies to reading, writing, creating, and deleting files and
directories alike, and to any command whose effects land outside the project
root. Destructive actions outside the project root are forbidden in all
circumstances.

**The one exception:** Experiments and scratch work belong in the `/tmp`
directory — and only when the user has asked for them or given permission.
Anything created there is still subject to the same non-destructive rules: do
not delete, overwrite, or modify anything in `/tmp` that the agent did not
create itself.

### Obligation to Fix

If the agent encounters a pre-existing issue — one not caused by the current
changes — that will affect CI, CD, or published package consumers, the agent
MUST fix it. This is NOT optional. The agent must not ignore, skip, or defer
such issues regardless of whether they were introduced by the agent's own
changes. A broken pipeline or a broken published package is the agent's
responsibility if the agent is aware of it.

### Planning

ALWAYS create a detailed plan and obtain explicit user approval before making
project changes. Do not begin implementation until the plan is approved.

### Code Philosophy

- **Functional and declarative:** The codebase is small, pure, and composable by
  design. Components are function components; utilities are pure functions that
  take arguments and return values — they never reach for globals or hidden
  state. Keep it this way
- **Types as the public contract:** Shared p5 contracts (`Sketch`,
  `P5CanvasInstance`, `Updater`, `SketchProps`, refs, and the generic
  `P5CanvasProps<Props, OutputNode>`) come from `@p5-wrapper/common` — this
  repository's own contracts are the React bindings on top. The only local
  contract file is `src/contracts/P5CanvasProps.ts`, which binds common's
  `OutputNode` to `ReactNode`. Generic defaults flow through `SketchProps` —
  understand the generic chain (`Sketch<Props>` → `P5CanvasInstance<Props>` →
  `Updater<Props>` → `P5CanvasProps<Props, ReactNode>`) before touching any of
  them
- **One contract per file, one export per file:** React-specific contracts live
  in `src/contracts/`, one file per contract, named after the export. React
  utilities live in `src/utils/`, one file per function, named after the
  function. Anything shared across frameworks belongs in `@p5-wrapper/common`,
  not here
- **No hidden dependencies:** The component tree is deliberately layered —
  `P5Canvas` (memoisation) → `P5CanvasGuard` (validation + error boundary +
  suspense) → `P5CanvasWithSketch` (lifecycle). Responsibilities stay in their
  layer; utils never import components; contracts never import utils
- **Imperative p5, declarative React:** p5 instances are imperative and mutable
  by nature. The bridge is contained entirely in `P5CanvasWithSketch`, which
  calls the lifecycle utilities (`createP5CanvasInstance`,
  `updateP5CanvasInstance`, `removeP5CanvasInstance`) from `@p5-wrapper/common`.
  Do not leak imperative p5 patterns into the React layer above
- **Lazy boundaries:** `P5CanvasGuard` and `react-error-boundary` are lazily
  imported so consumers who never trigger them never pay the bundle cost. Any
  new heavy dependency must follow the same `React.lazy` pattern

### Testing

- **Test first:** Tests for new behaviour are written before or alongside the
  implementation, never as an afterthought. Every component in `src/components/`
  has one in `tests/components/`. Utility functions and shared
  contracts/constants are owned and tested by `@p5-wrapper/common`, not here.
  Keep the 1:1 component mapping
- **Black-box testing:** Test the rendered output and observable behaviour
  (`data-testid` hooks: `canvas-container`, `loading`, `error`), not internal
  implementation details
- **Environment:** Vitest with `happy-dom`, `vitest-canvas-mock` for the canvas
  API, and `@testing-library/react`. `p5.disableFriendlyErrors = true` is set in
  `tests/setup.ts` to stop p5's DOM scanning from causing unhandled rejections —
  do not remove it. `afterEach` cleanup is also mandatory
- **Structure:** Tests live in `tests/components/`, mirroring `src/components/`.
  New `src/` component files must add the matching test file
- **Coverage:** CI runs `pnpm test:coverage` and comments coverage deltas on
  PRs. Do not reduce coverage of existing code
- **Skipped tests:** Two loading-UI tests are currently `it.skip`-ped due to
  suspense timing behaviour. Do not delete them; fixing them is a valid task

### PR Descriptions

When asked to generate a PR description, create a `PR_DESCRIPTION.md` file in
the project root (this file is gitignored and must never be committed). Follow
the PR template at `.github/PULL_REQUEST_TEMPLATE.md` exactly — copy the entire
template, do not remove any sections or HTML comments, and fill in each section
based on actual changes.

**Important:** Being asked to generate a PR description is NOT the same as being
asked to create a PR. Only create an actual pull request when explicitly told to
do so.

**Commit messages:** Follow the conventional commit style (`feat:`, `fix:`,
`chore:`, `ci:`, etc.). Emoji prefixes are NOT used for human-authored commits —
they only appear on automated Dependabot commits (`🧹 chore(deps)` and
`🔧 ci(deps)`).

**No co-authored commits:** Agents MUST NOT add `Co-authored-by` trailers or any
other attribution that signs off a commit on the agent's behalf. Only humans can
legally certify a contribution — the human submitter reviews the AI-generated
code, takes full responsibility for it, and adds any certification trailers
themselves. Following the rules the Linux kernel team enforce for AI coding
assistants, an agent's role in a commit ends at the message body — no
`Signed-off-by`, no `Co-authored-by`, no other trailers or sign-offs. See [AI
Coding Assistants — The Linux Kernel documentation]
(https://docs.kernel.org/process/coding-assistants.html), integrated into this
ruleset on 2026-09-03.

**Assisted-by attribution:** Where attribution for AI assistance is wanted, use
an `Assisted-by: LLM` trailer in the commit message body rather than a co-author
or sign-off trailer. It records that the contribution was produced with AI
assistance without certifying or authoring it. This mirrors the kernel's
`Assisted-by: LLM [TOOL1] [TOOL2]` format — optionally list specialised analysis
tools after `LLM`, but never list basic development tools (git, compilers,
editors, linters). Only add the trailer when the user has asked for AI
attribution; the default is no trailer at all.

### Documentation Maintenance

Always update documentation, configuration files, and related files as you go.
Documentation must never be out of date. If a change affects `README.md`,
`AGENTS.md`, configuration files, or any other documentation, update them in the
same change. Clean as you go — take ownership of every file you touch.

If formatting, linting, or other tooling fixes issues in files you did not
originally author, do not revert those fixes. CI would break again. Accept
responsibility for the state of the codebase after your changes, not just the
lines you intended to change.

## Project Overview

**Purpose:** A React wrapper component (`P5Canvas`) for integrating
[p5.js](https://p5js.org/) sketches into React applications. It is published to
npm as `@p5-wrapper/react` and consumed by downstream projects, including the
sibling `@p5-wrapper/next` package.

**Key characteristics:**

- **Library + demo in one repo:** The npm library builds from `src/` while the
  GitHub Pages demo builds from `demo/`. Both share one Vite config that
  switches on mode
- **p5 instance mode:** Sketches run in p5 instance mode (not global mode). The
  wrapper owns the p5 lifecycle — instances are created when a sketch is
  provided, destroyed and recreated when the `sketch` prop changes, and removed
  on unmount
- **React 19:** Requires `react >= 19` and `react-dom >= 19`. React Compiler
  lint rules are active
- **Version 5:** The public API is `P5Canvas` (renamed from `ReactP5Wrapper` in
  v4) plus the exported types and `CanvasContainerClassName`

## Architecture

### Component Layering

```
P5Canvas (src/components/P5Canvas.tsx)
  React.memo + propsAreEqual (from @p5-wrapper/common, microdiff deep comparison)
  └─ P5CanvasGuard (lazy)
       sketch validation → fallback UI or:
       ErrorBoundary (lazy react-error-boundary) + Suspense
       └─ P5CanvasWithSketch
            refs: canvasContainerRef, p5CanvasInstanceRef, updaterRef
            effects: create/update instance on sketch change,
                     updateWithProps + updater on props change,
                     remove instance on unmount
            renders: div.canvas-container with children
```

Why the layers exist:

- `P5Canvas` only handles memoisation — a deep comparison (common's
  `propsAreEqual`, powered by `microdiff`) so p5 is not needlessly recreated
- `P5CanvasGuard` handles absence (missing `sketch` → `fallback`), errors
  (`error` render prop → error boundary), and async loading (`loading` →
  suspense)
- `P5CanvasWithSketch` is the only place that touches the p5 instance lifecycle
  via common's utilities

### Public API

Everything exported from `src/main.tsx` is public API and semver-protected:

- `P5Canvas` — the component
- `CanvasContainerClassName` — CSS class of the container div
  (`"canvas-container"`)
- Types: `P5CanvasInstance`, `P5CanvasProps`, `Sketch`, `SketchProps`, `Updater`

### File Organisation

```
.
├── CLAUDE.md                 # Symlink to AGENTS.md — agents edit AGENTS.md only
├── AGENTS.md                 # This document
├── package.json              # Scripts, engines, exports map, dependencies
├── pnpm-workspace.yaml       # Supply-chain settings (strict peers, release age)
├── pnpm-lock.yaml            # Committed lock file
├── tsconfig.json             # Strict TypeScript config + path aliases
├── src/
│   ├── main.tsx               # Public API barrel — the library entry point
│   ├── components/            # React components (one per file, default or named exports)
│   │   ├── P5Canvas.tsx
│   │   ├── P5CanvasGuard.tsx
│   │   └── P5CanvasWithSketch.tsx
│   └── contracts/             # React-specific contracts (common bindings)
│       └── P5CanvasProps.ts   # Binds common's OutputNode to ReactNode
├── tests/                     # Vitest tests for component behaviour
│   ├── components/
│   └── setup.ts               # Test bootstrap (canvas mock, cleanup)
├── config/
│   ├── eslint/eslint.config.ts
│   ├── prettier/prettier.json
│   └── vite/
│       ├── vite.config.ts     # Mode switch: lib (test + library) vs demo
│       ├── common.ts          # Shared path aliases
│       ├── library.ts        # Library build + Vitest config
│       └── demo.ts           # GitHub Pages demo build
├── demo/                      # Demo app (GitHub Pages) — plain JSX, no build type checking
│   ├── app.jsx
│   ├── index.html
│   └── sketches/              # Example sketches
├── dist/                      # Build output (gitignored)
└── .github/
    ├── actions/setup/         # Composite action: pnpm + Node + frozen install
    └── workflows/             # CI, CD, CodeQL
```

### Build Pipeline

- `pnpm build` = clean `dist` → `tsc` (type check) → library build
  (`dist/component`, ESM + CJS via Vite library mode, types bundled by
  `vite-plugin-dts` with `bundleTypes`) → demo build (`dist/demo`)
- `package.json` `exports` maps `types` → `main.d.ts`, `import` → ESM, `require`
  → CJS. The `files` field only ships `README.md` and `dist/component/*`
- The library entry filenames are pinned in `config/vite/library.ts` (`main.mjs`
  / `main.cjs`) to match the `package.json` `exports` map — the `.mjs`/`.cjs`
  extensions self-describe the module format, which is required because
  `"type": "module"` would otherwise treat a `.js` CJS entry as ESM and break
  `require()` for Node CJS consumers (this was broken in the published 5.0.4).
  Vite's `[format]` placeholder also changed from `esm` to `es` in Vite 8, so
  the names must never come from the placeholder again. If you change one side,
  change both in the same commit
- The library externals are `react`, `react/jsx-runtime`, `react-dom`, `p5`, and
  `@p5-wrapper/common` — keep Rollup externals, TypeScript expectations, and
  peer/runtime dependencies in agreement

## Commands

| Command                | Action                                                     |
| :--------------------- | :--------------------------------------------------------- |
| `pnpm install`         | Install dependencies (updates lockfile — commit the diff). |
| `pnpm dev`             | Run the Vite dev server with the demo app.                 |
| `pnpm format`          | Format all files with Prettier.                            |
| `pnpm format:check`    | Check formatting without writing.                          |
| `pnpm lint`            | Run ESLint (type-aware).                                   |
| `pnpm lint:fix`        | Run ESLint with autofix.                                   |
| `pnpm test`            | Run the Vitest suite.                                      |
| `pnpm test:coverage`   | Run tests with coverage (what CI runs).                    |
| `pnpm test:watch`      | Watch mode.                                                |
| `pnpm build:component` | Type check + build the npm library.                        |
| `pnpm build:demo`      | Build the demo app only.                                   |
| `pnpm build`           | Clean and build component + demo.                          |
| `pnpm integrate`       | format:check → lint → test → build (CI mirror).            |

## CI/CD

- **CI** (`continuous-integration.yml`): Runs on all PRs to `main` and
  `workflow_dispatch`. Jobs: `format`, `lint`, `test` (with coverage artifact
  and clover coverage delta comment), `build`, and `npm-dry-run` (validates the
  npm publish would succeed). CI concurrency cancels in-progress runs. Uses the
  `./.github/actions/setup` composite action with
  `pnpm install --frozen-lockfile`
- **CD** (`continuous-deployment.yml`): Runs on push to `main` and
  `workflow_dispatch`. Jobs: `gh-pages` (builds and deploys the demo to GitHub
  Pages) and `npm` (builds, tests, and publishes the package with provenance,
  then creates the matching `vx.y.z` GitHub release with auto-generated notes
  anchored at the previous version tag). CD concurrency does NOT cancel
  in-progress runs — never interrupt an in-flight publish
- **CodeQL** (`CODEQL.yml`): Security analysis on PRs and pushes to `main`
- **Dependabot:** Monthly for npm (one grouped update across all dependencies)
  and GitHub Actions, each limited to a single open pull request. Semver-major
  updates are ignored by config — they are handled manually on dedicated
  branches (e.g. the pnpm 11 / Vite 8 migration)
- **Permissions:** Workflows declare `permissions: {}` at the top and grant
  minimal per-job permissions. Keep it this way

## Guardrails

- **Never publish or deploy locally.** npm publishing requires the `NPM_TOKEN`
  secret and runs only in CD
- **Never weaken the build contract:** the `exports` map, `files` field, ESM +
  CJS dual output, and bundled types are what downstream consumers depend on
- **Never introduce a runtime dependency** beyond `@p5-wrapper/common` and
  `react-error-boundary` without discussion — bundle size is a feature of this
  library
- **Never disable or skip tests, lint rules, or type checks** to make a change
  pass. Fix the code, not the gate
- **Vite native config loader warning:** Vite currently warns that
  `config/vite/vite.config.ts` uses `__dirname` and extension-less imports
  unsupported by `configLoader: 'native'`. This is known and can be suppressed
  with `VITE_CONFIG_NATIVE_IGNORE_WARNING=true`. Fixing the config is a valid
  separate task, not a drive-by change

## Future Topics

- **@p5-wrapper/common adoption:** The shared contracts, utilities, and
  constants now come from `@p5-wrapper/common` (adopted on the
  `adopt-common-package` branch, pending merge). The only React-specific
  contract that remains is `src/contracts/P5CanvasProps.ts`
- **Skipped loading-UI tests:** The two `it.skip` suspense tests in
  `tests/components/P5Canvas.test.tsx` need a reliable strategy before being
  re-enabled
- **Vite native config loader:** Migrate `vite.config.ts` off `__dirname` and
  extension-less imports to clear the `configLoader: 'native'` warning
- **Semver-major dependency bumps:** Dependabot ignores them; they are done
  deliberately on dedicated branches (e.g. the pnpm 11 / Vite 8 migration)
