# Outcraft — Brand Book

**Core Identity · v1.0** — Logo · Typography · Colour
outcraft.ai

---

## 01 — Logo

C:\Users\Admin\Documents\Outcraft.ai\Development\Personal\SaaS Explainer - Outcraft AI\video 1\assets\logo\Outcraft_logo_black_1800w.png
C:\Users\Admin\Documents\Outcraft.ai\Development\Personal\SaaS Explainer - Outcraft AI\video 1\assets\logo\Outcraft_logo_white_1800w.png

---

## 02 — Typography

Bricolage Grotesque for display. Inter for body & UI. **Never set body copy in the display face.**

| Face | Settings | Used for |
| --- | --- | --- |
| Bricolage Grotesque | Weight 700 · tight tracking | Headlines & display |
| Inter | 400 body · 600 UI · `ss01` on | Body, buttons, eyebrows |

### Scale

| Role | Size (px) | Notes |
| --- | --- | --- |
| Display | 56 / 48 / 32 | Tracking −2 → −1px |
| Heading | 22 / 20 / 18 | Weight 600 |
| Body | 16 / 15 | — |
| Eyebrow | 14 | Tracking +1.6, uppercase |
| Tabular | — | Tabular figures: 1234567890 |

Sample body setting: *"one AI platform for the revenue moments that matter most."*

---

## 03 — Colour

Purple is the single CTA colour. Coral for small highlights only. **Max two brand colours per surface.**

### Brand

| Name | Hex | Role |
| --- | --- | --- |
| Outcraft Purple | `#6366F1` | Primary |
| Deep Indigo | `#232F8B` | Depth |
| Dark Teal | `#003F4E` | Dark sections |
| Coral | `#FE4E32` | Accent |

### Extended

| Name | Hex |
| --- | --- |
| Purple Hover | `#4F46E5` |
| Purple Press | `#4338CA` |
| Purple Soft | `#818CF8` |
| Purple Subdued | `#E7E7FD` |
| Teal Dark 2 | `#012A34` |
| Teal Mid | `#12857F` |

### Ink

| Name | Hex |
| --- | --- |
| Near Black | `#010101` |
| Secondary | `#33353A` |
| Muted | `#6A6F76` |

### Surfaces

| Name | Hex |
| --- | --- |
| White | `#FFFFFF` |
| Warm Cream | `#FAF8F1` |
| Light Grey | `#F6F7F7` |

### Borders

| Name | Hex |
| --- | --- |
| Cool Grey | `#E6E9EB` |
| Input | `#CDD2D6` |
| Focus | `#6366F1` |

### Gradients

| Name | Stops |
| --- | --- |
| Brand | `#6366F1` → `#232F8B` |
| Dark Teal | `#003F4E` → `#012A34` |
| Spark | `#6366F1` → `#FE4E32` |

---

## Rules of thumb

- One filled purple CTA per band
- No emoji
- Lucide icons at 1.5–2px stroke

---

## Design tokens

Derived from the values above for direct use in code.

```css
:root {
  /* Brand */
  --outcraft-purple: #6366F1;
  --deep-indigo:     #232F8B;
  --dark-teal:       #003F4E;
  --coral:           #FE4E32;

  /* Extended */
  --purple-hover:    #4F46E5;
  --purple-press:    #4338CA;
  --purple-soft:     #818CF8;
  --purple-subdued:  #E7E7FD;
  --teal-dark-2:     #012A34;
  --teal-mid:        #12857F;

  /* Ink */
  --ink-near-black:  #010101;
  --ink-secondary:   #33353A;
  --ink-muted:       #6A6F76;

  /* Surfaces */
  --surface-white:   #FFFFFF;
  --surface-cream:   #FAF8F1;
  --surface-light:   #F6F7F7;

  /* Borders */
  --border-cool:     #E6E9EB;
  --border-input:    #CDD2D6;
  --border-focus:    #6366F1;

  /* Gradients */
  --gradient-brand:  linear-gradient(#6366F1, #232F8B);
  --gradient-teal:   linear-gradient(#003F4E, #012A34);
  --gradient-spark:  linear-gradient(#6366F1, #FE4E32);

  /* Type */
  --font-display: "Bricolage Grotesque", sans-serif;
  --font-body:    "Inter", sans-serif;
}
```

---

*Outcraft AI — Brand Book v1.0*
