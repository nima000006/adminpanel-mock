---
name: ui-component-alignment
description: >-
  Runs the Component Alignment interview before new UI work in this admin panel:
  ask which components exist, which need building, and which need extending. Use
  when implementing a new UI feature or design, or when the user asks to build a
  screen, layout, or form UI.
---

# UI Component Alignment

## Anti-goals

- Do not start coding a new UI feature/design until the inventory questions below are answered.
- Do not invent new shared components when an existing one in `src/components` (especially `CustomInputs`) fits.

## Component Alignment Phase

1. **Ask for Component Inventory** (one message, all three):
   - Which components/UI elements required for this feature already exist in our codebase?
   - Which components need to be built from scratch?
   - Are there any existing components that need to be extended or refactored for this feature?

2. **Reuse first** — prefer `src/components` / `CustomInputs` before creating new ones. Check `docs/components/` when documenting shared usage.

3. **Wait for confirmation** — pause until the user responds.

Then continue with architecture/style and any other triggered skills (API, advance filter, etc.).
