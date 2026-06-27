---
name: Kinetic Velocity
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#3a3939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#c4c9ac'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#8e9379'
  outline-variant: '#444933'
  surface-tint: '#abd600'
  primary: '#ffffff'
  on-primary: '#283500'
  primary-container: '#c3f400'
  on-primary-container: '#556d00'
  inverse-primary: '#506600'
  secondary: '#b3c5ff'
  on-secondary: '#002b75'
  secondary-container: '#0266ff'
  on-secondary-container: '#f9f7ff'
  tertiary: '#ffffff'
  on-tertiary: '#313030'
  tertiary-container: '#e5e2e1'
  on-tertiary-container: '#656464'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#c3f400'
  primary-fixed-dim: '#abd600'
  on-primary-fixed: '#161e00'
  on-primary-fixed-variant: '#3c4d00'
  secondary-fixed: '#dae1ff'
  secondary-fixed-dim: '#b3c5ff'
  on-secondary-fixed: '#001849'
  on-secondary-fixed-variant: '#003fa4'
  tertiary-fixed: '#e5e2e1'
  tertiary-fixed-dim: '#c8c6c5'
  on-tertiary-fixed: '#1c1b1b'
  on-tertiary-fixed-variant: '#474746'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  display-lg:
    fontFamily: Montserrat
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 52px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Montserrat
    fontSize: 36px
    fontWeight: '800'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Montserrat
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  title-sm:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.05em
  data-metric:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 40px
  container-margin: 16px
  gutter: 12px
---

## Brand & Style

The design system is engineered for high-performance fitness tracking, targeting athletes and data-driven users who demand precision and speed. The brand personality is energetic, disciplined, and technologically advanced. 

The aesthetic leverages a **Modern Corporate/SaaS** framework infused with **Glassmorphism** and **High-Contrast** accents. It prioritizes a "Glanceable UI" philosophy—ensuring that critical biometric data is readable during high-intensity movement. The emotional response should be one of empowerment and momentum, utilizing deep backgrounds to make performance metrics feel like glowing instrumentation in a cockpit.

## Colors

This design system utilizes a "Void and Neon" strategy. The foundation is built on deep blacks and charcols to preserve battery life on OLED mobile devices and reduce eye strain in low-light environments.

- **Primary (Electric Lime):** Reserved for peak performance states, primary calls to action, and completed goals. It provides maximum contrast against the dark base.
- **Secondary (Electric Blue):** Used for secondary data streams, active tracking states, and interactive links.
- **Surface Tiers:** Backgrounds use `#0F0F0F`. Card surfaces use `#1A1A1A` with subtle 1px borders to define boundaries without heavy shadows.
- **Functional Colors:** Success is tied to the Primary Lime; warnings use a high-vibrancy Orange (#FF8A00); errors use a saturated Red (#FF3B30).

## Typography

The typography strategy focuses on a hierarchy of "Data vs. Context." **Montserrat** is used for impactful headlines and large numeric metrics, providing a geometric, aggressive feel that reflects strength. **Inter** is used for all functional UI elements, body copy, and labels to ensure maximum legibility at small sizes.

Key metrics (like heart rate or pace) should use the `data-metric` style to stand out. All labels for charts and data points must use `label-caps` to distinguish metadata from user content.

## Layout & Spacing

The design system employs a **Fluid Grid** model optimized for PWA (Progressive Web App) feel. The layout behaves like a native mobile application, utilizing a bottom-navigation bar on handheld devices.

- **Grid:** A 4-column grid for mobile and a 12-column grid for desktop.
- **Rhythm:** An 8pt linear scale is used for all spatial relationships.
- **Safe Zones:** 16px horizontal margins are mandatory for all views to prevent content from hitting the edge of mobile bezels.
- **Adaptation:** On tablet and desktop, cards reflow into a masonry-style dashboard rather than stretching to full width, maintaining a "modular widget" appearance.

## Elevation & Depth

Depth is communicated through **Tonal Layering** and **Glassmorphism** rather than traditional drop shadows.

- **Level 0 (Base):** Deep Charcoal (#0F0F0F).
- **Level 1 (Cards):** Dark Grey (#1A1A1A).
- **Level 2 (Overlays/Modals):** Semi-transparent Grey (#252525) with a 20px Backdrop Blur (Saturate 150%).
- **Borders:** Instead of shadows, use 1px solid borders (`#2A2A2A`) for inactive cards and 1px borders using the Primary Lime (`#CCFF00`) at 30% opacity for active/focused states.
- **Glow:** High-priority metrics may use a very soft, subtle outer glow matching the color of the metric (12px blur, 10% opacity) to simulate a digital readout.

## Shapes

The shape language is "Athletic Geometric." All containers use a consistent 0.5rem (8px) radius to feel modern but structured. 

- **Standard Elements:** Buttons and Input fields use the `rounded` (8px) token.
- **Progress Containers:** Track bars and progress rings use "Pill-shaped" (Full Rounding) endings to emphasize fluid movement.
- **Iconography:** Icons should be stroke-based (2px weight) with slightly rounded terminals to match the font weight of Inter.

## Components

- **Buttons:** Primary buttons are solid Electric Lime with black text. Secondary buttons are outlined with Electric Blue. Use a "press" state that scales the button down to 98% for tactile feedback.
- **Data Cards:** Every card must have a `label-caps` header. Content should be padded by 16px. 
- **Progress Bars:** Use a thick (8px) track with a "Neon" glow effect on the filled portion.
- **Chips/Badges:** Small, high-contrast pills used for workout tags (e.g., "HIIT", "Strength"). Use subtle semi-transparent fills (15% opacity of the accent color).
- **Input Fields:** Darker than the card background (#121212) with a 1px bottom border that illuminates in Electric Blue when focused.
- **Activity Rings:** Concentric circles using the Primary, Secondary, and a Tertiary (Purple #AF52DE) color to show multi-metric progress.