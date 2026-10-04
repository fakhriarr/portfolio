export type Experience = {
  id: string;
  role: string;
  company: string;
  type?: 'Freelance' | 'Internship' | 'Full-time' | 'Part-time';
  start: string; // "YYYY-MM"
  end: string | null; // null = Present
  highlights: string[]; // 4–5 items
  skills: string[]; // 3–5 chips
  emphasis?: string; // optional phrase inside a highlight to highlight with accent-soft
};

export const experience: Experience[] = [
  {
    id: 'freelance',
    role: 'UI/UX Designer',
    company: 'Freelance',
    type: 'Freelance',
    start: '2024-03',
    end: null,
    highlights: [
      'Design responsive web and mobile interfaces for e-commerce, company profiles, village information systems, and online learning platforms.',
      'Create user flows, wireframes, high-fidelity mockups, and interactive prototypes based on user and project requirements.',
      'Collaborate with clients to translate requirements into intuitive, user-friendly interface solutions.',
      'Maintain design consistency with reusable UI components and established design principles.',
    ],
    skills: [
      'User flows',
      'Wireframing',
      'High-fidelity design',
      'Prototyping',
      'UI components',
    ],
  },
  {
    id: 'coding-collective',
    role: 'UI/UX Designer',
    company: 'Coding Collective',
    type: 'Internship',
    start: '2026-02',
    end: '2026-08',
    highlights: [
      'Designed 20+ responsive web interfaces across industries, including company profiles, retail platforms, dashboards, payment websites, and business applications.',
      'Created wireframes, high-fidelity mockups, and interactive prototypes in Figma, based on user needs and business requirements.',
      'Collaborated with developers and project stakeholders to ensure accurate design implementation.',
      'Maintained design consistency through reusable UI components and documentation.',
    ],
    skills: [
      'Figma',
      'Responsive design',
      'Prototyping',
      'Developer handoff',
      'Documentation',
    ],
    emphasis: '20+ responsive web interfaces',
  },
  {
    id: 'diskominfo',
    role: 'UI/UX Designer',
    company: 'DISKOMINFO Yogyakarta',
    type: 'Internship',
    start: '2025-07',
    end: '2025-09',
    highlights: [
      'Designed a government dashboard system over two months, focusing on data visualization, workflow efficiency, and user-centered interface improvements.',
      'Designed user-centered interfaces for government digital services to improve usability and accessibility.',
      'Gathered requirements from stakeholders and translated them into intuitive user experiences.',
      'Produced wireframes, prototypes, and interface documentation for development teams.',
      'Refined interface designs based on stakeholder feedback and usability considerations.',
    ],
    skills: [
      'Dashboard design',
      'Data visualization',
      'Accessibility',
      'Stakeholder research',
      'Documentation',
    ],
  },
];

/* ---------------------------------------------------------------------------
   Derived helpers — rendering order and date formatting (PRD Addendum §4).
   --------------------------------------------------------------------------- */

/** Reverse-chronological, with the current role (end === null) first. */
export const sortedExperience: Experience[] = [...experience].sort((a, b) => {
  if (a.end === null && b.end === null) return b.start.localeCompare(a.start);
  if (a.end === null) return -1;
  if (b.end === null) return 1;
  return b.end.localeCompare(a.end);
});

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
] as const;

const FULL_MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const;

/** "YYYY-MM" → "Mon YYYY" (e.g. "2026-02" → "Feb 2026"). */
export function formatMonth(iso: string): string {
  const [year, month] = iso.split('-').map(Number);
  return `${MONTHS[month - 1]} ${year}`;
}

/** "YYYY-MM" → "Month YYYY" (e.g. "2024-03" → "March 2024") for screen readers. */
export function formatMonthLong(iso: string): string {
  const [year, month] = iso.split('-').map(Number);
  return `${FULL_MONTHS[month - 1]} ${year}`;
}

/** FR-EXP-7 — elapsed duration from a start date to now, e.g. "2 yrs 7 mos". */
export function elapsedSince(iso: string, now = new Date()): string {
  const [year, month] = iso.split('-').map(Number);
  let months = (now.getFullYear() - year) * 12 + (now.getMonth() + 1 - month);
  if (months < 0) months = 0;

  const years = Math.floor(months / 12);
  const rest = months % 12;
  const parts: string[] = [];

  if (years) parts.push(`${years} yr${years > 1 ? 's' : ''}`);
  if (rest || !years) parts.push(`${rest} mo${rest === 1 ? '' : 's'}`);
  return parts.join(' ');
}
