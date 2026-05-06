# Apollo Genesis Nexus — Phase 1 Architecture

## Runtime modules
- `GlobeEngine`: owns world rendering loop, cell placement, and globe breathing animation.
- `TranslationOrb`: first-touch activation and language selection.
- `CreationTool`: nucleus preview + MVP commit form.
- `useUserSystem`: local persistence and returning-user detection.
- `AudioEngine`: placeholder provider for Phase 2 Tone.js layering.

## Cell placement strategy
Phase 1 uses deterministic Fibonacci sphere placement to keep spacing uniform for thousands of cells, while preserving room for a later membrane adjacency solver.

## Data model
The local model matches target backend schema:
- id
- position
- color
- tone
- instrument
- message
- creator
- tier
- created_at

## Phase 2 hooks already prepared
- Audio context/provider boundary.
- Tier value persisted per cell.
- `commitCell` can be redirected to API route + DB without UI changes.
