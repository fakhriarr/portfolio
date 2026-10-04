# Portfolio — Muhammad Fakhri Ar Rouf

Single-page UI/UX design portfolio built from `PRD_Portfolio_Website.md` plus the
`PRD_Addendum_Work_Experience.md` addendum. Light theme only, black/white with one blue
accent, Motion-driven animation.

Stack: **Vite · React 19 · TypeScript · Tailwind CSS v4 · Motion · Radix Dialog**

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build into dist/
npm run preview    # serve the production build locally
```

## Editing content — you never need to touch a component

| What | Where |
|------|-------|
| Name, role, age, education, tools, portrait path, SEO | `src/data/profile.ts` |
| Hero copy | `src/data/profile.ts` → `hero` |
| About copy and the Name/Age/Education rows | `src/data/profile.ts` → `about` |
| Work experience heading, subtitle, optional CV path | `src/data/profile.ts` → `experienceSection` |
| Work experience entries | `src/data/experience.ts` |
| Contact details (email, phone, LinkedIn, Dribbble) | `src/data/profile.ts` → `contact` |
| Tools marquee list | `src/data/profile.ts` → `marqueeTools` |
| Nav links (full label + mobile short label) | `src/data/profile.ts` → `navLinks` |
| Projects (cards + modal come from the same array) | `src/data/projects.ts` |

### Adding a project

Append one object to the array in `src/data/projects.ts`:

```ts
{
  slug: 'my-project',            // used for the #project=my-project link
  title: 'My Project',
  category: 'Website redesign',
  short: 'One sentence, ~110 characters max.',
  cover: '/projects/my-project.webp',   // 16:10 WebP; leave '' for the wireframe placeholder
  overview: 'Paragraph shown under “Overview”.',
  goals: ['Goal one', 'Goal two'],
  takeaways: 'What you learned — shown in the blue box.',
  gallery: ['/projects/my-project-1.webp', '/projects/my-project-2.webp'],  // optional popup images
  links: [{ label: 'Figma prototype', url: 'https://…' }],  // optional, hidden when empty
}
```

Cards and the detail modal both render from this array, so adding a sixth project
needs no other change.

### Adding an experience entry

Append one object to the array in `src/data/experience.ts`:

```ts
{
  id: 'company-name',          // stable React key
  role: 'UI/UX Designer',
  company: 'Company Name',
  type: 'Internship',          // Freelance | Internship | Full-time | Part-time; omit to hide the tag
  start: '2025-01',            // YYYY-MM
  end: '2025-06',              // YYYY-MM, or null for the current role ("Present")
  highlights: ['…', '…', '…', '…'],   // 4–5 bullets
  skills: ['Figma', '…'],      // 3–5 chips
  emphasis: '20+ interfaces',  // optional phrase inside a highlight to tint with the accent
}
```

The list re-sorts itself (current role first, then reverse-chronological) and the
timeline spine measures the new dot automatically, so a fourth entry needs no other
change. Only the current role shows a duration and the pulsing “Present” badge.

### Download CV button

Set `experienceSection.cvUrl` in `src/data/profile.ts`. The button is **hidden unless
the file actually exists** — drop a PDF at `public/CV_Muhammad_Fakhri_Ar_Rouf.pdf` and it
appears; remove it and the button disappears. No code change needed.

## Images & resolutions

Set the file paths in the data files; the components read from there. All image
components hide/fall back on error, so a wrong path never shows a broken image.

| Where | File path / data | Aspect | Recommended export |
|-------|------------------|--------|--------------------|
| Hero portrait | `profile.heroPortrait` → file in `public/photo/` | 4:5 | **1000×1250** WebP/PNG, cut-out with transparent background (2× = 2000×2500 max) |
| Contact card image | `profile.portrait` → file in `public/photo/` | 4:5 | **1000×1250** WebP/PNG |
| Hero inline thumbnails | `hero.thumbTop` / `hero.thumbBottom` → file in `public/icons/` | 1:1 | Square slot (`0.66em × 0.66em`, `object-cover`) so square art is never cropped. Display size is CSS — the `width`/`height` attrs only set the aspect hint |
| Project covers | `project.cover` → file in `public/projects/` | 16:10 | **1600×1000** WebP/AVIF (2× = 3200×2000 max), sRGB, ~80% quality |
| Popup gallery images | `project.gallery` → files in `public/projects/` | any | Landscape ~1600px wide; shown at natural ratio in a 2-column grid |
| Marquee tool icons | `marqueeTools[].icon` → file in `public/icons/` | 1:1 | **SVG preferred**; if raster use **64×64** PNG/WebP with transparent bg |

Notes:

- **Hero and contact use separate photos.** `profile.heroPortrait` (hero) and
  `profile.portrait` (contact) are independent — change one without affecting the other.
- **Hero thumbnails** are set by `hero.thumbTop` and `hero.thumbBottom` in
  `src/data/profile.ts`; swap in your own images there. They render as squares that
  scale with the headline (`0.66em`); enlarge by raising that value (e.g. `1em`) — a
  fixed `h-40 w-40` (160px) overflows the headline line and gets clipped.
- **Hero portrait reveal** is a CSS animation (`.hero-portrait-rise` in `src/index.css`),
  not a Motion mount animation, so it stays visible under React StrictMode in `dev`.
- **Where to put files:** Vite serves everything in `public/` from the site root, so a
  file at `public/projects/foo.png` is referenced as `'/projects/foo.png'` — **not**
  `'/public/projects/foo.png'` (that path 404s and falls back to the placeholder).
- **Project cover fallback.** Leave `cover: ''` to keep the grey wireframe placeholder.
  In `src/components/ProjectMedia.tsx` the declared size is `1600×1000`, so export 16:10.
- **Popup gallery.** Add `gallery: ['/projects/foo-1.png', '/projects/foo-2.png']` to a
  project to show extra images in the modal under a “Gallery” heading; omit it to hide.
- **Tool icons are optional.** Add `icon: '/icons/figma.svg'` to an entry in
  `marqueeTools` (`src/data/profile.ts`). Without an `icon` the marquee shows just the
  accent spark as a separator; a missing file quietly renders nothing.
- **Card hover cursor.** The bubble text and look live in `src/components/ViewCursor.tsx`
  (label default, `BUBBLE` size, colours); the per-card label is
  `data-cursor-label="View"` in `src/components/ProjectCard.tsx`.

### Marquee (running text) speed

`src/components/Marquee.tsx`, top of file:

```ts
/** Seconds for one full loop of the marquee. Lower = faster. */
const LOOP_SECONDS = 40;
```

Change `40` → e.g. `25` to speed up or `60` to slow down. Scroll velocity temporarily
multiplies this speed and flips direction; hover or keyboard focus pauses it. Under
reduced motion the marquee becomes a static wrapped chip list.

## Other assets

| Asset | Current placeholder | What to do |
|-------|---------------------|------------|
| Open Graph image | `public/og-image.png` (1200×630, generated) | Edit `public/og-template.html`, then regenerate: `"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu --hide-scrollbars --window-size=1200,630 --screenshot=public/og-image.png "http://localhost:4173/og-template.html"` while `npm run preview` is running. |
| Favicon | `public/favicon.svg` | Black rounded square + accent spark. |
| Fonts | `public/fonts/*.woff2` | Self-hosted Bricolage Grotesque + Instrument Sans (SIL Open Font License). |

## Design tokens

All colour, type, radius and easing values live in `src/styles/tokens.css` and are
mapped into Tailwind in `src/index.css` via `@theme inline`. Swapping the accent is a
one-line change:

```css
:root { --accent: #2b4dff; }
```

## Motion inventory (PRD §7.2)

| ID | Where | Implementation |
|----|-------|----------------|
| M1 | Page load | `components/Reveal.tsx` (`MaskLine`, `MaskBlock`), `components/Hero.tsx` — masked slide-up, staggered; replays as a 300 ms fade on later visits in the same session (`sessionStorage`) |
| M2 | Hero thumbnails | `ThumbCycle` in `Hero.tsx` — 2.4 s vertical slide-crossfade, offset between the two |
| M3 | Accent spark | `HeroSpark` / `Contact` — 20 s spin + scroll-driven quarter turn, paused off-screen |
| M4 | Tools marquee | `Marquee.tsx` — rAF loop, speed/direction react to scroll velocity, pauses on hover and focus |
| M5 | About | `About.tsx` — word-by-word colour scrub, dividers draw with `scaleX`, rows stagger |
| M6 | Project cards | `Projects.tsx` grid variants + `ProjectCard` cover parallax |
| M7 | Card hover | `ProjectCard` (lift, cover scale, plus-button fill) + `ViewCursor` bubble |
| M8 | Modal | `ProjectModal.tsx` — Radix Dialog animated with Motion, shared-element `layoutId` cover, bottom sheet + drag-to-dismiss on mobile |
| M9 | Nav | `Nav.tsx` — hide on scroll down, spring pill indicator |
| M10 | Contact | `Contact.tsx` — 0.96→1 scale, 64→40 px radius, magnetic email button |
| M11 | Buttons | `components/Button.tsx` — vertical label roll on hover |
| M12 | Anchor scroll | `lib/scroll.ts` — smooth scroll with nav-height offset |
| M13 | Experience heading | Reuses `SectionHeading` / `MaskLine` — masked slide-up when the section enters view |
| M14 | Timeline spine + dots | `Experience.tsx` + `TimelineItem.tsx` — `useScroll` scrubs `scaleY` on the spine; dots switch hollow → filled accent as the progress line reaches them (measured from the DOM) |
| M15 | Experience entries | `TimelineItem.tsx` variants — date/role slide from a mask, highlights stagger 50 ms, chips pop 30 ms |
| M16 | "Present" badge | `PresentBadge` — 2 s pulsing accent dot, paused while the section is off-screen |
| M17 | Entry hover (desktop) | `Experience.tsx` — non-hovered entries dim to 45%, hovered one gains a `--surface` panel (disabled on touch/reduced motion) |
| M18 | Emphasis highlight | `Emphasis` in `TimelineItem.tsx` — `--accent-soft` wipes in left → right behind the key phrase |

Reduced motion (`prefers-reduced-motion: reduce`) removes every transform above: the
marquee becomes a wrapped chip list, the About paragraph renders as plain text, hero
thumbnails show the first cover only, the modal fades in, the timeline spine is fully
drawn with dots pre-filled, and the experience entries appear without reveals, pulse or
hover dimming.

## Open items from the PRD

1. Age — currently `23` in `profile.ts`.
2. Dribbble URL — currently `https://dribbble.com/fakhriar`.
3. Accent — currently `#2b4dff`.
4. Portrait without the orange outline — still the placeholder.
5. Project covers and optional project links — still placeholders.
6. CV PDF — add `public/CV_Muhammad_Fakhri_Ar_Rouf.pdf` to reveal the Download CV button.
7. Experience details (addendum §9): employment type shown as *Internship* for both
   Coding Collective and DISKOMINFO; Coding Collective end date uses **Aug 2026** (CV);
   company name uses **DISKOMINFO Yogyakarta**.
8. Achievements — edit `achievementsSection.items` in `profile.ts`. The section
   (`#achievements`) renders under Work experience; it is not in the top nav.

## Deploying

Static build, works on Vercel or Netlify with no configuration:

```bash
npm run build     # outputs dist/
```

- **Vercel**: import the repo, framework preset *Vite*, build `npm run build`, output `dist`.
- **Netlify**: build `npm run build`, publish `dist`.
- `vercel.json` is included for SPA rewrites.