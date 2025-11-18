# Learn Crypto – Improvement Plan

## Context & Objectives
- Ship the highest-impact fixes from the evaluation (Nov 2025) to make the platform stable, accessible, and contributor-friendly.
- Document a phased roadmap so we can track what is being delivered now vs. queued for later sprints.
- Keep scope realistic for a short feature branch while leaving hooks for future expansion.

## Phase 1 – Sprint “Stability” (current branch)
| Track | Goals | Tasks |
| --- | --- | --- |
| Content delivery | Make `/resources/[slug]` reliable and cache-friendly. | Fix the route params type, switch to async file IO, add metadata (title/description), reuse Markdown render pipeline, add error boundaries. |
| Theming | Consolidate theme logic to avoid duplication and hydration flashes. | Introduce a single theme provider (e.g. Context + `data-theme`), remove inline script duplication, ensure toggle + system preference share the same source of truth. |
| Mind map UX | Eliminate random node jitter and make layout deterministic. | Replace `Math.random()` fallback with deterministic coordinates (grid/auto layout) and memoized positions per filter; add helper utils + types. |
| Accessibility | Resource modal must be keyboard- and screen-reader-friendly. | Wrap panel in a11y dialog (focus trap, `role="dialog"`, close on `Esc` / backdrop), announce progress updates, and keep local progress abstraction-ready for backend sync later. |

## Phase 2 – Sprint “Discoverability”
1. **Search & Advanced Filters**: add command palette / keyword search, highlight matches on the canvas, and expose resource tags.
2. **Content Validation Pipeline**: move topics/resources into structured JSON/YAML, validate via Zod + CI script, and add automated snapshot tests.
3. **UI Polish**: responsive mini-map, breadcrumbs for markdown pages, category legend tweaks, and loading states for Theme/MindMap.

## Phase 3 – Sprint “Growth”
1. **User Accounts & Progress Sync** (Supabase/Clerk) with cloud-backed checkpoints.
2. **Learning Paths & Export/Import** derived from curated topic sequences.
3. **Analytics + Feature Flags** to measure topic engagement and gate beta features.
4. **Content Ingestion Workflow** (headless CMS or Contentlayer) for non-technical contributors.

## Execution Checklist
1. ✅ Create `improvement-plan` branch.
2. ✅ Capture this plan in `docs/IMPROVEMENT_PLAN.md`.
3. 🔄 Implement Phase 1 tracks (commits grouped per track).
4. 🔄 Add lightweight tests/lint for touched surfaces.
5. 🔄 Update README/CONTRIBUTING with new workflows before merging.

## Success Metrics
- Zero runtime errors when navigating markdown resources (Next telemetry / Sentry).
- No theme flash on load; toggle state persists across reloads.
- Mind map maintains node positions when filters change (visual diff + Cypress screenshot).
- Resource modal passes axe-core accessibility scan.

After Phase 1 merges, revisit this doc to mark delivered items and flesh out timelines for Phases 2–3.

