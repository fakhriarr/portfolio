export type ContactLink = {
  label: string;
  value: string;
  href: string;
  /** Renders as an external link with rel="noopener noreferrer". */
  external?: boolean;
};

export const profile = {
  name: 'Muhammad Fakhri Ar Rouf',
  role: 'UI/UX Designer',
  /** PRD open item 1 — owner to confirm. */
  age: 22,
  education: {
    degree: 'Bachelor of Informatics',
    institution: 'UIN Sunan Kalijaga Yogyakarta',
    gpa: '3.70/4.00',
  },
  tools: [
    'Figma',
    'Adobe Photoshop',
    'Adobe XD',
    'Canva',
    'Affinity',
    'Maze',
    'Trello',
    'Jira',
    'Azure',
  ],
  /** Contact section photo. */
  portrait: '/photo/photo.webp',
  /** Hero section photo. */
  heroPortrait: '/photo/herophoto.webp',
  seo: {
    title: 'Muhammad Fakhri Ar Rouf — UI/UX Designer',
    description:
      'Portfolio of Muhammad Fakhri Ar Rouf, a UI/UX Designer crafting simple, intuitive web and mobile interfaces.',
  },
} as const;

export const hero = {
  intro: "Hi, I'm Fakhri!",
  headline: {
    before: 'Where complexity meets clarity,',
    middle: 'and good ideas',
    after: 'feel effortless.',
  },
  supporting:
    'Web and mobile design, from first sketch to polished prototype.',
  /** Inline images woven into the headline (top row / bottom row). */
  thumbTop: '/icons/atas.png',
  thumbBottom: '/icons/bawah.png',
} as const;

export const about = {
  heading: 'About me',
  paragraph:
    "I'm a fresh graduate with a background in Informatics who is passionate about UI/UX design. I enjoy understanding user problems and translating them into simple, intuitive, and visually engaging interfaces. My process starts with user research and problem identification, followed by ideation, wireframing, and high-fidelity design. Real-world projects and design competitions have helped me grow both my creativity and my problem-solving skills.",
  details: [
    { label: 'Name', value: profile.name },
    { label: 'Age', value: String(profile.age) },
    {
      label: 'Education',
      value: `${profile.education.degree} — ${profile.education.institution}`,
      note: `GPA ${profile.education.gpa}`,
    },
  ],
} as const;

export const experienceSection = {
  heading: 'Work experience',
  subtitle:
    'Freelance projects and internships where I turned user needs into shipped interfaces.',
  /** FR-EXP-8 — the Download CV button is hidden while this file is missing. */
  cvUrl: '/CV_Muhammad_Fakhri_Ar_Rouf.pdf',
} as const;

export const achievementsSection = {
  heading: 'Achievements',
  subtitle: 'Awards and competition results from my UI/UX work.',
  items: [
    {
      title: 'Best User Experience & Design',
      event: 'PROXOCORIS 2024 “Technology for Sustainable”',
      date: 'April 2024',
    },
    {
      title: 'Best Favorite Project',
      event: 'UI/UX Competition UINIC 6.0',
      date: 'July 2024',
    },
  ],
} as const;

export const projectsSection = {
  heading: 'Selected projects',
  subtitle: 'Five projects across web, e-commerce, dashboards, and mobile.',
} as const;

export const contact = {
  heading: "Let's work together!",
  line: "Have a project in mind or want to talk about an opportunity?",
  email: 'fakhriarrouf2003@gmail.com',
  emailLabel: 'Send me an email',
  phoneDisplay: '0858 7040 2536',
  phone: '+6285870402536',
  links: [
    {
      label: 'LinkedIn',
      value: 'linkedin.com/in/fakhriarrouf',
      href: 'https://linkedin.com/in/fakhriarrouf',
      external: true,
    },
    {
      label: 'Dribbble',
      value: '@fakhriar',
      href: 'https://dribbble.com/fakhriar',
      external: true,
    },
  ] satisfies ContactLink[],
} as const;

export type MarqueeTool = {
  name: string;
  /**
   * Optional logo, e.g. '/icons/figma.svg' from /public/icons.
   * Falls back to the accent spark glyph when omitted or missing.
   */
  icon?: string;
};

export const marqueeTools: MarqueeTool[] = [
  { name: 'Figma',  icon: '/icons/figma.png' },
  { name: 'Adobe Photoshop', icon: '/icons/photoshop.png' },
  { name: 'Adobe XD', icon: '/icons/xd.png'},
  { name: 'Canva', icon: '/icons/canva.png' },
  { name: 'Affinity', icon: '/icons/affinity.png' },
  { name: 'Maze', icon: '/icons/maze.png' },
  { name: 'Trello', icon: '/icons/trello.png' },
  { name: 'Jira', icon: '/icons/jira.png' },
  { name: 'Azure', icon: '/icons/azure.png' },
  { name: 'UI Design', icon: '/icons/uidesign.png' },
  { name: 'Wireframing', icon: '/icons/wireframing.png' },
  { name: 'Prototyping', icon: '/icons/prototyping.png' },
  { name: 'UX Research', icon: '/icons/uxresearch.png' },
  { name: 'Usability Testing', icon: '/icons/usability.png' },
];

export const navLinks = [
  { label: 'About', shortLabel: 'About', href: '#about' },
  { label: 'Experience', shortLabel: 'Work', href: '#experience' },
  { label: 'Projects', shortLabel: 'Projects', href: '#projects' },
  { label: 'Contact', shortLabel: 'Contact', href: '#contact' },
] as const;

export const siteMeta = {
  year: 2026,
} as const;