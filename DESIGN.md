```markdown
# Design System Specification: The Kinetic Console

## 1. Overview & Creative North Star
**Creative North Star: "The Sentinel Interface"**
This design system moves beyond the cliché "hacker" aesthetic into a high-end, editorial interpretation of a terminal. It is built to feel like a high-fidelity monitoring station—authoritative, precise, and deeply immersive. We achieve this by rejecting the "flat" web standard in favor of **Tonal Depth** and **Asymmetric Layouts**. 

Instead of centering everything, we embrace the "Command Line" flow: content should feel like it’s being streamed or logged, utilizing significant left-aligned anchors and purposeful "dead space" to focus the eye on critical code snippets or project highlights.

---

## 2. Colors & Surface Architecture
The palette is rooted in a "Deep Space" obsidian, layered with toxic emeralds and electric indigos.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using `1px solid` borders to define sections. Layout boundaries must be established through color shifts between `surface` and `surface_container_low`. Use the `outline_variant` token only at 10%–20% opacity as a "Ghost Border" for interactive elements, never for structural layout separation.

### Surface Hierarchy
We treat the UI as a series of stacked, light-emitting panels:
- **Base Layer:** `surface` (#131318) - The infinite void.
- **Sectional Layer:** `surface_container_low` (#1b1b20) - Used for large content blocks.
- **Component Layer:** `surface_container` (#1f1f25) - The standard "card" or terminal window background.
- **Active/Hover Layer:** `surface_container_high` (#2a292f) - Elevated state for interactive elements.

### The "Glass & Glow" Rule
To elevate the terminal feel, apply a `backdrop-blur` (12px+) to any floating navigation or modal using a semi-transparent `surface_variant`. 
- **Signature Glow:** Primary CTAs should not just have a fill; they should emit a subtle `0 0 20px` glow using the `primary_container` token to mimic a CRT phosphorus burn.

---

## 3. Typography
The type system creates a tension between the brutalist geometry of *Space Grotesk* and the utilitarian clarity of *Inter* and *JetBrains Mono*.

| Level | Token | Font | Size | Character |
| :--- | :--- | :--- | :--- | :--- |
| **Display** | `display-lg` | Space Grotesk | 3.5rem | Negative letter-spacing (-0.02em), Bold. |
| **Headline** | `headline-md` | Space Grotesk | 1.75rem | All-caps for section headers. |
| **Title** | `title-md` | Inter | 1.125rem | Medium weight, high legibility. |
| **Body** | `body-md` | Inter | 0.875rem | Secondary text for descriptions. |
| **Code** | `label-md` | JetBrains Mono | 0.75rem | Used for all `>_` terminal prefixes. |

**Editorial Note:** Use JetBrains Mono for "metadata" (dates, tags, tech stacks) to reinforce the developer persona.

---

## 4. Elevation & Depth
We eschew traditional drop shadows for **Tonal Layering** and **Ambient Luminescence**.

- **The Layering Principle:** To lift an element, move it up the surface tier (e.g., a `surface_container_highest` card sitting on a `surface_container_low` section).
- **Ambient Shadows:** For floating modals, use a shadow with a blur of `40px` and an opacity of `8%`, tinted with the `secondary` (#c0c1ff) token. This mimics the soft light spill from a high-end monitor.
- **Scanline Overlay:** Apply a global fixed overlay with a repeating linear gradient (0.5px lines) at 3% opacity. This adds a physical "hardware" texture to the digital screen.

---

## 5. Components

### Buttons (The "Command" Variants)
- **Primary:** Background `primary` (#4edea3), text `on_primary`. Apply a subtle outer glow. Radius: `md` (0.375rem).
- **Secondary:** "Ghost" style. No fill. `outline` border at 20% opacity. On hover, background becomes `primary_container` at 10% opacity.
- **Prefixes:** All buttons must be preceded by a `//` or `>` character in `primary` color to maintain the terminal language.

### Cards & Lists
- **Rule:** Absolute prohibition of divider lines. 
- **Structure:** Separate list items using `spacing-8` (2rem) and a subtle background shift to `surface_container_low`. 
- **Interactions:** On hover, a card should shift from `surface_container` to `surface_container_high` with a `2px` left-border accent in `primary`.

### Terminal Input Fields
- **Styling:** Underline-only or subtle `surface_container_lowest` fill. 
- **Active State:** The cursor should be a solid `primary` block that pulses (0.8s ease-in-out).
- **Error:** Use the `error` (#ffb4ab) token for the "Ghost Border" and helper text.

### Interactive Tooltips
- **Glassmorphism:** Use `surface_bright` at 80% opacity with a `16px` backdrop-blur. This ensures the tooltip feels like an "overlay" on the terminal glass.

---

## 6. Do’s and Don’ts

### Do:
- **Use Intentional Asymmetry:** Align headings to the far left and body copy to a shifted center-right grid to create visual interest.
- **Animate Transitions:** Use typing effects for Display text on page load. Use a "slide-and-fade" (20px Y-offset) for content entrance.
- **Maintain High Contrast:** Ensure `text_primary` (#fafafa) is used for all core content against the dark backgrounds.

### Don't:
- **Don't use 100% Opaque Borders:** This shatters the "glass console" immersion.
- **Don't Overuse the Accent Color:** Indigo (`secondary`) is for "Accent" (links, tags, specific highlights). Overusing it will dilute the impact of the Emerald (`primary`) brand color.
- **Don't Use Standard Radii:** Never go above `xl` (0.75rem). This system is sharp, technical, and precise. Roundness should be minimal.

### Accessibility Note:
While we use low-opacity borders, interactive elements must maintain a minimum 4.5:1 contrast ratio. Use the `surface_tint` to highlight focused elements for keyboard navigation.```