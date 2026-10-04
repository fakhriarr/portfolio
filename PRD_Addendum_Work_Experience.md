# PRD Addendum — Work Experience Section

**Extends:** `PRD_Portfolio_Website.md` v1.0 · **Version:** 1.1-addendum
Everything in the main PRD still applies (light theme, black/white + one blue accent, typography, motion principles, reduced-motion rules, accessibility, tech stack). This addendum only adds the **Work Experience** section and the small changes it causes elsewhere. Where the two documents conflict, this addendum wins for the Work Experience section only.

---

## 1. Changes to the Main PRD

| Area | Change |
|------|--------|
| Information architecture (§3) | New order: Navigation → Hero → Tools marquee → About → **Work Experience** → Projects → Contact → Footer |
| Navigation (FR-NAV-1) | Links become **About · Experience · Projects · Contact**. The sliding active-link pill (FR-NAV-2) must include the new section. On mobile, keep one row; shorten labels if needed (About, Work, Projects, Contact). |
| Data & structure (§10.2) | Add `src/data/experience.ts`, `components/Experience.tsx`, `components/TimelineItem.tsx` |
| Motion inventory (§7.2) | Add M13–M18 (below) |
| Acceptance criteria (§11) | Add the checklist in §8 of this addendum |

---

## 2. Purpose

Show recruiters, in a few seconds, **where he has worked, in what role, for how long, and what he did**. It must be scannable first (role, company, dates) and detailed second (responsibilities).

- Reverse-chronological timeline, 3 entries.
- Matches the site's clean black-and-white style. Accent is used only for the timeline dot/line progress, the "Present" indicator, and small highlights.

---

## 3. Functional Requirements

- **FR-EXP-1** Section id `experience`, heading **"Work experience"**, subtitle: *"Freelance projects and internships where I turned user needs into shipped interfaces."*
- **FR-EXP-2** Desktop (≥1024px): two columns. Left column is **sticky** (heading + subtitle + optional CV button). Right column is the vertical timeline. Mobile/tablet: single column, heading on top.
- **FR-EXP-3** Timeline: a thin vertical spine (`--line`) with one dot per entry, on the left edge of the entries. Dots are hollow (`--line` border) by default and become filled `--accent` when the entry is the active one (see M14).
- **FR-EXP-4** Each entry shows, in this order:
  1. **Date range** (small, muted) e.g. `Mar 2024 – Present`
  2. **Role** as H3 in display font e.g. "UI/UX Designer"
  3. **Company** and **type tag** (small pill on `--surface`) e.g. "Coding Collective · Internship"
  4. **Highlights**: bullet list of 4–5 items, readable at ≤ 65 characters per line
  5. **Skill chips**: 3–5 small pills (`--surface`) listing what was used or practiced
- **FR-EXP-5** The current role (end date `null`) shows a **"Present"** badge with a small pulsing accent dot instead of an end date.
- **FR-EXP-6** (Should) Where a highlight contains a key number (e.g. "20+ web interfaces"), render that phrase with `--accent-soft` background to make it scannable. Only one such highlight per entry.
- **FR-EXP-7** (Could) Compute and show duration from dates, e.g. "2 yrs 7 mos", only for the current role.
- **FR-EXP-8** (Could) "Download CV" secondary pill button in the left column, linking to `/public/CV_Muhammad_Fakhri_Ar_Rouf.pdf` (opens in new tab). Hidden if the file is missing.
- **FR-EXP-9** All entries are visible by default (no accordion), so recruiters never need to click to read experience.
- **FR-EXP-10** Entries are not links. No hover-only information.

### Optional sub-block: Recognition (Could)
Below the timeline, a compact two-row list "Recognition" with: *Best User Experience & Design — PROXOCORIS 2024 "Technology for Sustainable" (April 2024)* and *Best Favorite Project — UI/UX Competition UINIC 6.0 (July 2024)*. Same row style as the About definition list. Enable only if the owner confirms; default **off**.

---

## 4. Content (English) and Data

Content is taken from the owner's CV, lightly edited for grammar and conciseness (fixed the typo "governemnt"; merged two overlapping Coding Collective bullets). Do not invent clients, numbers, or achievements beyond this.

```ts
// src/data/experience.ts
export type Experience = {
  id: string;
  role: string;
  company: string;
  type?: "Freelance" | "Internship" | "Full-time" | "Part-time";
  start: string;            // "YYYY-MM"
  end: string | null;       // null = Present
  highlights: string[];     // 4–5 items
  skills: string[];         // 3–5 chips
  emphasis?: string;        // optional phrase inside a highlight to highlight with accent-soft
};

export const experience: Experience[] = [
  {
    id: "freelance",
    role: "UI/UX Designer",
    company: "Freelance",
    type: "Freelance",
    start: "2024-03",
    end: null,
    highlights: [
      "Design responsive web and mobile interfaces for e-commerce, company profiles, village information systems, and online learning platforms.",
      "Create user flows, wireframes, high-fidelity mockups, and interactive prototypes based on user and project requirements.",
      "Collaborate with clients to translate requirements into intuitive, user-friendly interface solutions.",
      "Maintain design consistency with reusable UI components and established design principles."
    ],
    skills: ["User flows", "Wireframing", "High-fidelity design", "Prototyping", "UI components"]
  },
  {
    id: "coding-collective",
    role: "UI/UX Designer",
    company: "Coding Collective",
    type: "Internship",
    start: "2026-02",
    end: "2026-08",
    highlights: [
      "Designed 20+ responsive web interfaces across industries, including company profiles, retail platforms, dashboards, payment websites, and business applications.",
      "Created wireframes, high-fidelity mockups, and interactive prototypes in Figma, based on user needs and business requirements.",
      "Collaborated with developers and project stakeholders to ensure accurate design implementation.",
      "Maintained design consistency through reusable UI components and documentation."
    ],
    skills: ["Figma", "Responsive design", "Prototyping", "Developer handoff", "Documentation"],
    emphasis: "20+ responsive web interfaces"
  },
  {
    id: "diskominfo",
    role: "UI/UX Designer",
    company: "DISKOMINFO Yogyakarta",
    type: "Internship",
    start: "2025-07",
    end: "2025-09",
    highlights: [
      "Designed a government dashboard system over two months, focusing on data visualization, workflow efficiency, and user-centered interface improvements.",
      "Designed user-centered interfaces for government digital services to improve usability and accessibility.",
      "Gathered requirements from stakeholders and translated them into intuitive user experiences.",
      "Produced wireframes, prototypes, and interface documentation for development teams.",
      "Refined interface designs based on stakeholder feedback and usability considerations."
    ],
    skills: ["Dashboard design", "Data visualization", "Accessibility", "Stakeholder research", "Documentation"]
  }
];
```

Rules for rendering:
- Sort by `end` descending with `null` first. Format dates as `Mon YYYY` (e.g., "Feb 2026"), separated by an en dash.
- Past roles use past tense, the current role uses present tense (already written that way in the data).
- If `type` is missing, omit the tag.

---

## 5. Layout Details

**Desktop (≥1024px)**
```
[ Work experience ]      ● Mar 2024 – Present  (• Present)
[ subtitle        ]      │ UI/UX Designer
[ (Download CV)   ]      │ Freelance  [Freelance]
   (sticky)              │ • highlight ...
                         │ [chip] [chip] [chip]
                         │
                         ● Feb 2026 – Aug 2026
                         │ UI/UX Designer ...
```
- Left column 4/12, right column 8/12, gap 64px. Entries separated by 56px of whitespace (no card boxes, no heavy borders).
- Role H3 `clamp(1.75rem, 3vw, 2.5rem)`, company in `--muted`, highlights in body size.

**Mobile (<768px)**: spine on the left (dots at 12px from edge), content indented 32px. Date above role. Chips wrap to multiple lines. No sticky behavior.

**Tablet (768–1023px)**: single column, same as mobile with wider content.

---

## 6. Motion Specification (additions)

Uses the same easing and rules as the main PRD §7 (only `transform`, `opacity`, `clip-path`).

| ID | Where | Behavior | Timing |
|----|-------|----------|--------|
| M13 | Section heading | Heading lines slide up from a mask when the section enters view (reuse the `SplitText` pattern from other sections). | 0.9s, once |
| M14 | Timeline spine and dots | The spine fills with `--ink`/`--accent` from top to bottom as the user scrolls through the list (`scaleY` scrubbed with `useScroll`, transform-origin top). Each dot switches from hollow to filled `--accent` (scale 1 → 1.25 → 1) when the spine reaches it. | Scrubbed; dot 0.3s |
| M15 | Entry reveal | When an entry enters the viewport: date and role slide up from a mask; highlights stagger in at 50ms (opacity + 16px rise); chips pop in at the end with 30ms stagger. Once only. | 0.8s |
| M16 | "Present" indicator | Small accent dot pulses (scale 1 → 1.8, opacity 0.6 → 0) in a loop. Pauses when off-screen. | 2s loop |
| M17 | Hover focus (desktop only, `pointer: fine`) | Hovering an entry dims the other entries to 45% opacity and gives the hovered one a subtle `--surface` background with 24px radius (animate opacity/background only). | 250ms |
| M18 | Emphasis highlight | The `--accent-soft` background behind the emphasized phrase wipes in from left to right (`scaleX` 0→1) after the entry reveals. | 0.6s, delay 0.4s |

**Reduced motion:** spine fully drawn, dots filled, no reveals/stagger, no pulse, no hover dimming. Content and layout identical.
**Mobile:** keep M13–M16 and M18; disable M17.

---

## 7. Accessibility

- Section is a `<section aria-labelledby="exp-title">`; entries are an ordered list `<ol>` of `<li>` (semantic timeline, newest first).
- Dates use `<time datetime="2024-03">`. The current role reads "March 2024 to present" to screen readers.
- Decorative spine, dots, and pulse are `aria-hidden`.
- The accent-soft emphasis must keep text contrast ≥ 4.5:1 (use `--ink` text).
- Hover-only states must not hide information (FR-EXP-10).

---

## 8. Acceptance Criteria (add to main PRD §11)

- [ ] "Experience" appears in nav (desktop and mobile), the active-link pill tracks the section, and anchor scroll lands below the nav.
- [ ] Three entries render from `data/experience.ts` in the correct order, with dates, role, company, type tag, highlights, and skill chips.
- [ ] The Freelance entry shows "Present" with the pulsing dot; the other two show end dates.
- [ ] Changing text in `experience.ts` updates the page with no component changes; adding a 4th entry works without layout breakage.
- [ ] Spine/dot animation (M14) runs smoothly and is fully drawn with reduced motion enabled.
- [ ] No horizontal scroll at 360px; sticky left column works at ≥1024px and unsticks gracefully on small screens.
- [ ] Only black, white, grays, and the blue accent are used; no other colors introduced.
- [ ] Keyboard and screen-reader pass: list semantics announced, no focus traps.

---

## 9. Open Items (owner to confirm)

1. **Employment type:** the CV lists Coding Collective and DISKOMINFO without a type, while the portfolio PDF calls both "Internship". The data above uses "Internship". Confirm or change.
2. **Coding Collective end date:** CV says August 2026, the portfolio says July 2026. Data uses **Aug 2026** (CV).
3. **Company name:** CV writes "DISKOMINFO Yogyakarta", the portfolio writes "DISKOMINFO DIY". Confirm the official name (city vs. province).
4. **Freelance clients:** add client names or project links only if the owner has permission to show them.
5. **CV file:** provide a clean PDF if the "Download CV" button (FR-EXP-8) should be enabled.
6. **Recognition block:** enable the optional Achievements sub-block? (default off)

---

## 10. Prompts for the AI Agent

### If the website is **not built yet**
> Read `PRD_Portfolio_Website.md` and `PRD_Addendum_Work_Experience.md` together. Build the whole site, including the Work Experience section between About and Projects, following the addendum for navigation, data, layout, motion (M13–M18), accessibility, and acceptance criteria. Implement the Work Experience section during Phase 2 (static) and Phase 3 (motion) of the main delivery plan. Use `src/data/experience.ts` exactly as provided.

### If the website **already exists**
> Using the existing codebase, add a Work Experience section according to `PRD_Addendum_Work_Experience.md`. Reuse the current design tokens, `SplitText`, scroll hooks, and `useReducedMotion`. Add `data/experience.ts`, `Experience.tsx`, and `TimelineItem.tsx`; update the nav items and active-section tracking; do not change other sections' behavior. When finished, list the files changed and confirm each acceptance criterion in §8.
