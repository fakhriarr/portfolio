# PRD — Personal Portfolio Website: Muhammad Fakhri Ar Rouf

**Version:** 1.0 · **Owner:** Muhammad Fakhri Ar Rouf · **Audience of this document:** an AI coding agent (and the owner as reviewer)
**Website language:** English only · **Theme:** Light only

> This PRD supersedes the earlier orange/lime prototype. Layout and content structure carry over; **colors, typography feel, and motion are redefined here.**

---

## 1. Product Overview

### 1.1 What we are building
A single-page personal portfolio website for a fresh-graduate UI/UX Designer. It presents who he is, the tools he uses, five case-study projects, and a clear way to get in touch.

### 1.2 Goals
| # | Goal | How we know |
|---|------|-------------|
| G1 | Make a strong first impression to recruiters and clients | Hero is understood in under 5 seconds; looks premium and distinctive |
| G2 | Showcase 5 projects with easy-to-scan cards and a focused detail popup | Any project detail reachable in 1 click, no page navigation |
| G3 | Convert visitors into contacts | Email / LinkedIn / Dribbble / phone visible in the contact CTA and reachable from the nav at any time |
| G4 | Demonstrate design craft through restrained, purposeful motion | Motion feels smooth (60fps) and never blocks reading or navigation |

### 1.3 Target users
- **Recruiters / hiring managers** scanning quickly on desktop or phone.
- **Potential freelance clients** looking for a UI/UX designer for web or mobile.
- **Fellow designers / developers** who may refer him.

### 1.4 Non-goals (v1)
Blog, CMS or admin panel, multi-language, dark mode, login, contact form backend, analytics dashboards, separate case-study pages. (The popup replaces case-study pages.)

---

## 2. Design Direction

### 2.1 Reference
Inspired by **gusta.studio**: a clean white canvas, very large confident headlines, black text, a single small color accent, pill-shaped UI, rounded media, inline imagery inside headline sentences, a big closing "Let's work together" call to action, and generous whitespace. **Take the feeling, not the layout or assets.** Do not copy their text, images, or exact structure.

### 2.2 Color tokens (light theme only)
Black and white dominate (about 95% of the surface). One accent is used sparingly.

| Token | Value | Usage |
|-------|-------|-------|
| `--bg` | `#FFFFFF` | Page background |
| `--surface` | `#F4F4F2` | Cards, tool chips, alternate sections |
| `--ink` | `#000000` | Headlines, primary text, primary buttons |
| `--muted` | `#6B6B6B` | Secondary text (must pass 4.5:1 on `--bg`) |
| `--line` | `#E5E5E3` | Dividers, borders |
| `--accent` | `#2B4DFF` | Hover fills, cursor bubble, focus ring, small highlight shapes, active nav indicator |
| `--accent-soft` | `#E9EDFF` | Tinted backgrounds for tags / key-takeaway box |

Rules:
- Accent appears in **at most 2–3 places per viewport**. Never as a large section background.
- Set `color-scheme: light` and do **not** add a dark theme or `prefers-color-scheme: dark` styles.
- All colors live as CSS variables so the accent can be swapped in one line.

### 2.3 Typography
- **Display:** *Bricolage Grotesque* (700–800), tight tracking (−0.03em), line-height ≈ 0.95–1.0.
- **Body/UI:** *Instrument Sans* (400/500/600), line-height 1.6, max line length ≈ 65 characters.
- Self-host both fonts (WOFF2, `font-display: swap`) and provide system fallbacks.
- Fluid type scale with `clamp()`: hero H1 ≈ `clamp(3rem, 9vw, 8.5rem)`, section H2 ≈ `clamp(2.25rem, 5.5vw, 4.5rem)`, body 17–18px.

### 2.4 Shape, spacing, layout
- Pills (fully rounded) for nav, buttons, chips. Large radius (28–32px) for cards and media; smaller radius (20px) for inner thumbnails.
- Container max-width 1280px, side padding 24px (mobile) / 40px (desktop). Section vertical padding 96–140px desktop, 64–80px mobile.
- Structure is communicated with whitespace and thin `--line` dividers, not heavy shadows. Shadows only on floating elements (nav, modal): soft and subtle.
- No gradients, no glassmorphism except a light backdrop blur behind the modal.

### 2.5 Visual accents
A single small accent motif: a **spark/asterisk shape in `--accent`** used in the hero and the contact section (SVG). It rotates (see motion). Do not scatter it elsewhere.

---

## 3. Information Architecture

Single page, scroll sections in this order:

1. Navigation (fixed)
2. Hero
3. Tools marquee (thin strip)
4. About
5. Projects
6. Contact CTA
7. Footer

Nav links: **About · Projects · Contact** (anchor links with smooth scroll).

---

## 4. Functional Requirements

### 4.1 Navigation
- **FR-NAV-1** Floating pill nav, centered at top on desktop; fixed with safe-area padding on mobile. Logo/initials "FR" at left is optional; links About, Projects, Contact.
- **FR-NAV-2** Active-section indicator: a pill highlight slides to the link of the section in view (IntersectionObserver).
- **FR-NAV-3** Hides on scroll down, reappears on scroll up (and always visible at page top).
- **FR-NAV-4** Mobile (<768px): same pill, 3 compact links; no hamburger needed.

### 4.2 Hero
- **FR-HERO-1** Small intro line: "Hi, I'm Muhammad Fakhri Ar Rouf".
- **FR-HERO-2** Giant headline (copy in §5.1) with **inline rounded image thumbnails** between words, in the spirit of the reference. Thumbnails cycle through project covers (placeholders until real covers are added).
- **FR-HERO-3** Role tag "UI/UX Designer" as a small black pill, slightly rotated (−3°).
- **FR-HERO-4** Two buttons: primary "View projects" (black, scrolls to Projects) and secondary "Let's talk" (outlined, scrolls to Contact).
- **FR-HERO-5** Portrait photo (see §9) placed at right on desktop, above the headline on mobile. Accent spark SVG near the headline.
- **FR-HERO-6** Hero must fit the first viewport on desktop (≥1024px, height ≥700px) without cutting off the CTA buttons.

### 4.3 Tools marquee
- **FR-MQ-1** Thin full-width strip with the tools and skills repeating horizontally: Figma, Adobe Photoshop, Adobe XD, Canva, Maze, Trello, Jira, Azure, UI Design, Wireframing, Prototyping, UX Research, Usability Testing.
- **FR-MQ-2** Separated by small accent spark glyphs. Pauses on hover (desktop).

### 4.4 About
- **FR-ABOUT-1** Left: section heading "About me" and the paragraph in §5.2. Right: a definition list with rows **Name, Age, Education, Tools**, each separated by a thin line.
- **FR-ABOUT-2** Tools row shows chips (rounded pills on `--surface`). Icons are optional; if used, use official brand marks at consistent size in monochrome.
- **FR-ABOUT-3** Age is read from a single config value (placeholder: 23, owner to confirm).
- **FR-ABOUT-4** Education row: "Bachelor of Informatics — UIN Sunan Kalijaga Yogyakarta · GPA 3.70/4.00". Do **not** display dates (CV and portfolio disagree).

### 4.5 Projects
- **FR-PROJ-1** Section heading "Selected projects" with a one-line subtitle.
- **FR-PROJ-2** Exactly **5 project cards** rendered from data (§6). Desktop: 2-column grid, the 5th card spans both columns. Mobile: 1 column.
- **FR-PROJ-3** Each card shows: cover image (16:10; placeholder if missing), category tag, **title**, **short description (max ~110 characters)**, and a circular "+" / arrow button.
- **FR-PROJ-4** The whole card is a single `<button>` (keyboard focusable, Enter/Space opens).
- **FR-PROJ-5** Clicking opens a **modal** (§4.6). No page navigation.

### 4.6 Project detail modal
- **FR-MODAL-1** Contains exactly three content blocks, in this order: **Overview** (paragraph), **Project goals** (bullet list), **Key takeaways** (highlight box on `--accent-soft`). Header shows cover, category tag, and title.
- **FR-MODAL-2** Close via × button, Esc key, or click on backdrop. Focus moves into the modal on open and returns to the originating card on close. Focus is trapped inside while open. Background scroll is locked.
- **FR-MODAL-3** Desktop: centered panel, max-width ~820px, internal scroll if taller than viewport. Mobile: **bottom sheet** (full-width, max-height 92dvh, rounded top corners).
- **FR-MODAL-4** (Should) Prev/Next project buttons inside the modal.
- **FR-MODAL-5** (Should) URL hash sync, e.g. `#project=royaltech-beauty`, so a project can be linked and opened on load.
- **FR-MODAL-6** (Optional) Project link buttons (Figma prototype / Dribbble / live site) if provided in data; hidden if empty.

### 4.7 Contact CTA
- **FR-CTA-1** Large rounded block (black background, white text) — the one place where black is used as a section background. Heading "Let's work together!", short line, then the contact list.
- **FR-CTA-2** Shows the owner's photo and contacts: Email (`mailto:`), Phone (`tel:`), LinkedIn, Dribbble. External links open in a new tab with `rel="noopener noreferrer"`.
- **FR-CTA-3** Primary button "Send me an email" in accent color.

### 4.8 Footer
- **FR-FOOT-1** "© 2026 Muhammad Fakhri Ar Rouf" and a "Back to top" link.

---

## 5. Content (English)

### 5.1 Hero
- Intro: **Hi, I'm Muhammad Fakhri Ar Rouf**
- H1: **I design simple, intuitive interfaces** `[thumb]` **people love** `[thumb]` **to use.**
- Role tag: **UI/UX Designer**
- Supporting line: *Web and mobile design, from first sketch to polished prototype.*

### 5.2 About
> I'm a fresh graduate with a background in Informatics who is passionate about UI/UX design. I enjoy understanding user problems and translating them into simple, intuitive, and visually engaging interfaces. My process starts with user research and problem identification, followed by ideation, wireframing, and high-fidelity design. Real-world projects and design competitions have helped me grow both my creativity and my problem-solving skills.

Details: Name — Muhammad Fakhri Ar Rouf · Age — 23 *(confirm)* · Education — Bachelor of Informatics, UIN Sunan Kalijaga Yogyakarta, GPA 3.70/4.00 · Tools — Figma, Adobe Photoshop, Adobe XD, Canva, Maze, Trello, Jira, Azure.

### 5.3 Contact
- Heading: **Let's work together!**
- Line: *Have a project in mind or want to talk about an opportunity? I'd love to hear from you.*
- Email: fakhriarrouf2003@gmail.com · Phone: 0858 7040 2536 (tel: +6285870402536) · LinkedIn: linkedin.com/in/fakhriarrouf · Dribbble: @fakhriar (assumed `https://dribbble.com/fakhriar`, confirm)

### 5.4 SEO / meta
- Title: `Muhammad Fakhri Ar Rouf — UI/UX Designer`
- Description: `Portfolio of Muhammad Fakhri Ar Rouf, a UI/UX Designer crafting simple, intuitive web and mobile interfaces.`
- Open Graph image: 1200×630, black/white, name + role (agent may generate a simple one).

---

## 6. Project Data

Keep all project content in one file (`src/data/projects.ts`). Cards and modal are rendered from it, so the owner can edit content without touching components.

```ts
export type Project = {
  slug: string;
  title: string;
  category: string;          // shown as small tag
  short: string;             // card description, ~110 chars max
  cover: string;             // path in /public/projects; placeholder shown if empty
  overview: string;
  goals: string[];
  takeaways: string;
  links?: { label: string; url: string }[];
};
```

```ts
export const projects: Project[] = [
 { slug: "royaltech-beauty", title: "RoyalTech Beauty", category: "Website redesign", cover: "",
   short: "A premium redesign of a beauty and skincare company's website.",
   overview: "RoyalTech Beauty is a beauty and skincare company whose existing website no longer reflected the brand's premium identity and offered an inconsistent user experience. This redesign modernizes the interface while improving usability, visual hierarchy, and overall user engagement.",
   goals: ["Improve readability","Strengthen visual identity","Increase CTA visibility","Create responsive layouts","Modernize the interface"],
   takeaways: "This project taught me the importance of redesigning with purpose rather than simply creating a more modern interface. Every visual improvement was driven by usability and business objectives." },
 { slug: "jumping-jack", title: "Jumping Jack", category: "Landing page", cover: "",
   short: "A bold restaurant landing page that makes visitors hungry.",
   overview: "JumpingJack is a restaurant landing page created to strengthen the brand's online presence and create a more engaging first impression. It presents the restaurant's identity through a modern, visually appealing interface that highlights signature dishes, encourages online orders, and motivates visitors to dine in.",
   goals: ["Create a visually appealing page that stimulates users' appetite","Strengthen the restaurant's brand identity","Improve content hierarchy to showcase featured menus","Encourage users to place online orders or visit the restaurant"],
   takeaways: "Designing for the food and beverage industry goes beyond aesthetics. Effective restaurant websites should evoke emotion and communicate brand personality." },
 { slug: "jacks-cake-house", title: "Jack's Cake House", category: "E-commerce", cover: "",
   short: "An e-commerce website for a premium bakery, from browsing to checkout.",
   overview: "Jack's Cake House is an e-commerce website designed for a premium bakery brand, providing a seamless experience from discovering products to completing online orders. Users can browse collections, customize cakes, manage their cart, and complete purchases.",
   goals: ["Design a website that reflects the bakery's premium brand identity","Create an intuitive shopping experience from product discovery to checkout","Simplify the cake customization and ordering process"],
   takeaways: "This project highlighted the importance of information hierarchy, intuitive purchasing flows, and reducing friction throughout the customer journey to create a shopping experience that is both enjoyable and efficient." },
 { slug: "lms-dashboard", title: "LMS Dashboard", category: "Web dashboard", cover: "",
   short: "A learning management platform for instructors and students.",
   overview: "This Learning Management System (LMS) streamlines online education with a comprehensive platform for instructors and students. The interface supports the full learning workflow, from course creation and content management to assignments, quizzes, progress tracking, and performance analytics.",
   goals: ["Build a comprehensive dashboard for managing online learning","Reduce cognitive load through a structured navigation system","Improve visibility of key metrics and course performance","Deliver a responsive experience for both instructors and students"],
   takeaways: "This project highlighted the importance of information hierarchy and consistency in designing an intuitive LMS that supports efficient learning workflows." },
 { slug: "satuintegritas", title: "SatuIntegritas", category: "Mobile app", cover: "",
   short: "A mobile app that puts daily employee activities in one place.",
   overview: "Satu Integritas is a mobile application designed to simplify daily employee activities within a single platform. It lets users manage attendance, task submissions, leave requests, documents, certificates, and personal profiles, reducing administrative complexity while improving productivity.",
   goals: ["Centralize employee services into one cohesive mobile platform","Reduce friction in completing routine administrative tasks","Improve information accessibility through a structured dashboard","Deliver a modern, responsive, and intuitive mobile experience"],
   takeaways: "Balancing multiple features within a single application requires thoughtful information hierarchy and intuitive user flows to maintain a smooth user experience." },
];
```

Placeholder cover (when `cover` is empty): `--surface` rectangle with a simple wireframe-style mock (3–4 gray bars). Never show a broken image.

---

## 7. Motion Specification

### 7.1 Principles
1. **Motion has a job**: reveal hierarchy, give feedback, or add personality at a few signature moments. No decorative motion on every element.
2. **Smooth and fast**: animate only `transform`, `opacity`, `clip-path`. Never animate layout properties (width, height, top, left).
3. **Consistent easing**: entrances use `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out-expo); hovers use `cubic-bezier(0.4, 0, 0.2, 1)`; physical interactions use springs (stiffness ≈ 260, damping ≈ 26).
4. **Never block the user**: no scroll-jacking, no long intros, content readable immediately.
5. **Accessible**: honors `prefers-reduced-motion` (§7.3).

### 7.2 Motion inventory
| ID | Where | Behavior | Timing |
|----|-------|----------|--------|
| M1 | Page load (hero) | H1 lines slide up from a mask (overflow hidden), staggered 80ms; photo reveals with `clip-path` from bottom to top; nav drops in from −20px; buttons fade/slide in last. Played once per session (`sessionStorage`), shortened to 300ms fade on repeat. | Total ≤ 1.4s, entrance duration 0.9s |
| M2 | Hero inline thumbnails | Each thumbnail cycles through project covers with a vertical slide-crossfade. The two thumbs are offset so they never change at the same time. | Change every 2.4s, transition 0.6s |
| M3 | Accent spark (hero, contact) | Continuous slow rotation, plus an extra rotation tied to scroll position (`useScroll`). | 20s per turn; +90° over the section scroll |
| M4 | Tools marquee | Infinite horizontal loop; **speed reacts to scroll velocity** (slightly faster when scrolling, direction flips with scroll direction); pauses on hover. | Base 40s per loop |
| M5 | About paragraph | Scroll-scrubbed word-by-word color fill from `--line` gray to `--ink` as the block moves through the viewport. Definition-list dividers draw from left to right (`scaleX` 0→1) when entering view; row content fades in with 60ms stagger. | Scrubbed; dividers 0.8s |
| M6 | Project cards (enter) | Cards rise 40px + fade, staggered per row (80ms). Cover images inside have subtle vertical parallax (±6%) on desktop. | 0.9s |
| M7 | Project cards (hover, desktop) | Cover scales 1.04; card lifts 4px; "+" button fills `--accent`, icon rotates 90°; a custom cursor bubble in `--accent` with the label "View" follows the pointer (only on `(pointer: fine)` and only over cards). Press state: scale 0.98. | 250–350ms; cursor spring-lerped |
| M8 | Modal open / close | **Shared-element transition (FLIP)**: the card's cover animates into the modal header position (Motion `layoutId`). Backdrop fades to 55% black with 4px blur. Content blocks (Overview, Goals, Takeaways) stagger in at 60ms. Close reverses. Mobile bottom sheet: slides up from bottom with spring; (Should) drag-down to dismiss. If shared-element fails, fall back to fade + scale 0.97→1. | Open 0.5s, close 0.35s |
| M9 | Nav | Hide on scroll down / show on scroll up (translateY). Active-link pill slides between links using shared layout animation. | 0.4s |
| M10 | Contact CTA | Black block scales from 0.96 to 1 and its corner radius eases from 64px to 40px as it enters; heading lines slide up from a mask; photo rises 60px; email button has a **magnetic** pull toward the cursor (desktop, max 12px offset). Contact links have an underline that draws left to right on hover. | 1s |
| M11 | Buttons (all) | Hover: text swaps with a vertical roll (duplicate label slides in from below). Focus-visible: 3px `--accent` ring (no animation needed). | 300ms |
| M12 | In-page anchor scroll | Smooth scroll with ease-out; offset for the nav height. Optional smooth-scroll library (Lenis) at low intensity. | 1s |

### 7.3 Reduced motion (`prefers-reduced-motion: reduce`)
Disable M1–M7, M9–M12 transforms and parallax; use instant states or a simple 150ms opacity fade. Marquee becomes a static wrapped row of chips. Hero thumbnails show the first image only. Modal opens with an opacity fade only. Smooth-scroll library disabled. Layout and content must remain identical.

### 7.4 Mobile motion
Disable custom cursor (M7 cursor), magnetic button, and card parallax. Keep M1, M2, M3, M4, M5, M6 (shorter distances), M8 (bottom sheet), M9. Test at 60fps on a mid-range Android device.

### 7.5 Performance rules
- Use `will-change: transform` only on actively animating elements and remove after.
- Pause off-screen animations (marquee, spark, thumbnail cycle) with IntersectionObserver.
- No layout shift: reserve image aspect ratios; fonts preloaded with fallback metrics.

---

## 8. Responsive & Accessibility

### 8.1 Breakpoints
Mobile `<768px` · Tablet `768–1023px` · Desktop `≥1024px` · Large `≥1440px` (cap container at 1280px). Test widths: 360, 390, 768, 1024, 1440, 1920.

| Section | Mobile | Desktop |
|---------|--------|---------|
| Hero | Photo on top, H1 below, buttons stacked or wrapping | Two columns, H1 left, photo right |
| About | Single column, paragraph then list | Two columns |
| Projects | 1 column | 2 columns, 5th card full width |
| Modal | Bottom sheet | Centered panel |
| Contact | Stacked, photo below text, cropped at bottom edge of block | Two columns |

### 8.2 Accessibility (WCAG 2.2 AA)
- Semantic landmarks (`header`, `nav`, `main`, `section` with headings, `footer`); one `h1`.
- All interactive elements keyboard reachable with visible focus (`--accent` ring).
- Modal: `role="dialog"`, `aria-modal="true"`, labelled by the project title, focus trap, Esc closes, focus returns.
- Text contrast ≥ 4.5:1 (check `--muted`); touch targets ≥ 44×44px.
- Meaningful `alt` text for the portrait; decorative SVGs `aria-hidden`.
- Marquee content duplicated for looping must be `aria-hidden` on the copy.
- Skip-to-content link.

---

## 9. Assets

| Asset | Spec / note |
|-------|-------------|
| Portrait | The photo in the old PDF has an **orange sticker outline**, which clashes with the new palette. Preferred: use the original photo, cut out the background, export transparent PNG/WebP (≥ 1200px tall). Fallback: use the existing cutout and place it inside a black or `--surface` circle/arch so the outline is hidden. Optional treatment: grayscale with a hover to color. |
| Project covers | 5 images, 16:10, ≥ 1600px wide, exported WebP/AVIF. Placeholders until supplied. |
| Tool icons | Optional, monochrome. Text chips are acceptable. |
| Favicon | Black rounded square with white "FR" or an accent spark. |
| OG image | 1200×630. |

---

## 10. Technical Requirements

### 10.1 Recommended stack
- **Vite + React + TypeScript**
- **Tailwind CSS** with design tokens mapped to the CSS variables in §2.2
- **Motion** (`motion/react`, formerly Framer Motion) for all animation: `useScroll`, `useTransform`, `layoutId`, `AnimatePresence`, springs
- **Radix UI Dialog** (or equivalent) for accessible modal primitives, animated with Motion
- *(Optional)* **Lenis** for smooth scrolling
- Deploy to **Vercel** or **Netlify** (static). A plain-HTML/CSS/JS build is acceptable only if all of §7 still works.

### 10.2 Suggested structure
```
src/
  components/ Nav, Hero, Marquee, About, Projects, ProjectCard, ProjectModal, Contact, Footer, Button, SplitText, Cursor
  data/ projects.ts, profile.ts      # profile: name, age, education, tools, contacts
  hooks/ useReducedMotion, useScrollDirection, useInView
  styles/ tokens.css
public/ projects/, photo/, fonts/
```
All text content comes from `data/` files, not hardcoded in components.

### 10.3 Quality budgets
- Lighthouse (mobile): Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95.
- LCP < 2.5s, CLS < 0.05, INP < 200ms. Initial JS ≤ 200KB gzipped.
- Images: WebP/AVIF, `srcset`, lazy-load below the fold, explicit width/height.
- Works in current Chrome, Safari (including iOS), Firefox, Edge.

---

## 11. Acceptance Criteria (QA checklist)

- [ ] Only black, white, neutral grays, and the single blue accent are visible; no orange/lime anywhere; no dark mode.
- [ ] Hero, About (name, age, education, tools), 5 project cards, Contact CTA with photo and contacts all present, in English.
- [ ] Clicking each card opens a modal with exactly: Overview, Project goals, Key takeaways. Esc / × / backdrop close it; focus returns to the card.
- [ ] All motion items M1–M12 implemented as specified; no motion uses layout properties; 60fps on a mid-range phone.
- [ ] With reduced motion enabled, the site is fully usable with no movement beyond simple fades.
- [ ] No horizontal scroll at 360px; layout verified at all test widths.
- [ ] Keyboard-only walkthrough works end to end; no focus traps outside the modal.
- [ ] Content editable by changing only `data/` files.
- [ ] Lighthouse budgets in §10.3 met.

---

## 12. Delivery Plan for the AI Agent

Work in phases, and confirm each phase builds and runs before moving on.

1. **Foundation** — scaffold project, tokens, fonts, layout shell, data files.
2. **Static build** — all sections fully responsive with no motion; project cards and modal functional and accessible.
3. **Motion pass** — implement M1–M12 in order, then reduced-motion and mobile variants.
4. **Polish & QA** — performance, accessibility audit, Lighthouse, cross-browser, SEO meta, favicon and OG image.
5. **Deploy** — publish and return the live URL plus a short README on how to edit content.

### Kickoff prompt (paste to the agent together with this PRD)
> Build the website described in this PRD exactly. Follow the phases in §12. Use the specified tokens, content, and motion inventory. Do not add features outside scope. Ask me only about items listed under "Open items". After each phase, summarize what you built and show how to run it.

### Open items (owner to confirm; agent uses defaults until then)
1. Age (default 23).
2. Dribbble URL (default `https://dribbble.com/fakhriar`).
3. Accent color (default `#2B4DFF`; change `--accent` to swap).
4. Portrait version without the orange outline.
5. Project cover images (placeholders until supplied) and optional project links.
6. Final dates for education and internships (not shown for now because CV and portfolio differ).
