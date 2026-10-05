export type Project = {
  slug: string;
  title: string;
  category: string;
  /** Card description, ~110 chars max. */
  short: string;
  /** Path in /public (e.g. '/projects/foo.png'); placeholder shown when empty. */
  cover: string;
  overview: string;
  goals: string[];
  takeaways: string;
  /** Extra images shown inside the project popup, e.g. ['/projects/foo-1.png']. */
  gallery?: string[];
  links?: { label: string; url: string }[];
};

export const projects: Project[] = [
  {
    slug: 'royaltech-beauty',
    title: 'RoyalTech Beauty',
    category: 'Website Redesign',
    cover: '/projects/royaltech.webp',
    short:
      'A premium redesign of a beauty and skincare company’s website.',
    overview:
      "RoyalTech Beauty is a beauty and skincare company whose existing website no longer reflected the brand's premium identity and offered an inconsistent user experience. This redesign modernizes the interface while improving usability, visual hierarchy, and overall user engagement.",
    goals: [
      'Improve readability',
      'Strengthen visual identity',
      'Increase CTA visibility',
      'Create responsive layouts',
      'Modernize the interface',
    ],
    takeaways:
      "This project taught me the importance of redesigning with purpose rather than simply creating a more modern interface. Every visual improvement was driven by usability and business objectives.",
    gallery: ['/projects/royaltech-1.webp', '/projects/royaltech-2.webp', '/projects/royaltech-3.webp', '/projects/royaltech-4.webp'],
  },
  {
    slug: 'jumping-jack',
    title: 'Jumping Jack',
    category: 'Landing Page',
    cover: '/projects/jumpingjack.webp',
    short: 'A bold restaurant landing page that makes visitors hungry.',
    overview:
      "JumpingJack is a restaurant landing page created to strengthen the brand's online presence and create a more engaging first impression. It presents the restaurant's identity through a modern, visually appealing interface that highlights signature dishes, encourages online orders, and motivates visitors to dine in.",
    goals: [
      'Create a visually appealing page that stimulates users’ appetite',
      'Strengthen the restaurant’s brand identity',
      'Improve content hierarchy to showcase featured menus',
      'Encourage users to place online orders or visit the restaurant',
    ],
    takeaways:
      'Designing for the food and beverage industry goes beyond aesthetics. Effective restaurant websites should evoke emotion and communicate brand personality.',
  },
  {
    slug: 'bertumbuh-academy',
    title: "Bertumbuh Academy",
    category: 'Education website',
    cover: '/projects/bertumbuh.webp',
    short:
      'A friendly course website that helps learners discover programs and register with ease.',
    overview:
      "Bertumbuh Academy is an offline course platform that helps people build practical skills in design, programming, and marketing. This website design covers the home page, course catalog, articles, and about page, helping visitors explore courses, meet instructors, read student testimonials, and get in touch through WhatsApp.",
    goals: [
      "Help visitors find the right course quickly with clear categories, search, and course types",
      "Build trust through instructor profiles, testimonials, and a clear brand story",
      "Create a friendly, approachable look that makes learning feel less intimidating",
      "Drive registrations and inquiries with clear calls to action"
    ],
    takeaways: "Designing for an education brand taught me that clarity and trust drive enrollment. Clear course cards, visible social proof, and a friendly visual tone make learning feel approachable, while consistent components keep a content-heavy website easy to scan.",
    gallery: ['/projects/bertumbuh-1.webp', '/projects/bertumbuh-2.webp', '/projects/bertumbuh-3.webp', '/projects/bertumbuh-4.webp'],
  },
  {
    slug: 'lms-dashboard',
    title: 'LMS Dashboard',
    category: 'Web Dashboard',
    cover: '/projects/lms.webp',
    short: 'A learning management platform for instructors and students.',
    overview:
      'This Learning Management System (LMS) streamlines online education with a comprehensive platform for instructors and students. The interface supports the full learning workflow, from course creation and content management to assignments, quizzes, progress tracking, and performance analytics.',
    goals: [
      'Build a comprehensive dashboard for managing online learning',
      'Reduce cognitive load through a structured navigation system',
      'Improve visibility of key metrics and course performance',
      'Deliver a responsive experience for both instructors and students',
    ],
    takeaways:
      'This project highlighted the importance of information hierarchy and consistency in designing an intuitive LMS that supports efficient learning workflows.',
  },
  {
    slug: 'satuintegritas',
    title: 'SatuIntegritas',
    category: 'Mobile Apps',
    cover: '/projects/satuintegritas.webp',
    short: 'A mobile app that puts daily employee activities in one place.',
    overview:
      'Satu Integritas is a mobile application designed to simplify daily employee activities within a single platform. It lets users manage attendance, task submissions, leave requests, documents, certificates, and personal profiles, reducing administrative complexity while improving productivity.',
    goals: [
      'Centralize employee services into one cohesive mobile platform',
      'Reduce friction in completing routine administrative tasks',
      'Improve information accessibility through a structured dashboard',
      'Deliver a modern, responsive, and intuitive mobile experience',
    ],
    takeaways:
      'Balancing multiple features within a single application requires thoughtful information hierarchy and intuitive user flows to maintain a smooth user experience.',
  },
  /* TODO: ganti placeholder di bawah dengan data project asli. */
  {
    slug: 'desa-bukit-bakar',
    title: 'Website Desa Bukit Bakar',
    category: 'Website Redesign',
    cover: '/projects/bukitbakar.webp',
    short:
      'A village website with online services, transparent budgets, and live staff attendance.',
    overview:
      'Desa Bukit Bakar is a village information website that brings public information and administrative services of a village government into one accessible place. The design covers the home page, an online cover-letter service (Surat Pengantar), the village history, and the vision and mission. Residents can request letters online, check the village budget (APB Desa), see population statistics and staff attendance, read news, browse the gallery, and send complaints to the village office.',
    goals: [
      "Make village information and public services easy to find for residents of all ages and digital skill levels",
      "Move routine administrative services, such as cover-letter requests, online with a clear step-by-step flow",
      "Increase transparency by presenting budgets, population statistics, and staff attendance visually",
      "Tell the village's story through its history, vision, mission, and flagship programs with a warm, trustworthy identity",
      "Deliver a responsive experience on both mobile and desktop"
    ],
    takeaways:
      'Designing for a community and government audience taught me to put clarity before decoration. Plain language, step-by-step flows, and a strong visual hierarchy matter more than visual flair when users range from village officials to residents with limited digital experience.',
    gallery: ['/projects/bukitbakar-1.webp', '/projects/bukitbakar-2.webp', '/projects/bukitbakar-3.webp'],
    // links: [{ label: 'Live site', url: 'https://example.com' }],
  },
  {
    slug: 'sema',
    title: 'SEMA Rewards',
    category: 'Website Redesign',
    cover: '/projects/sema.webp',
    short:
      'A redesign of a platform where creators learn, join brand campaigns, and get paid per view.',
    overview:
      'SEMA Rewards is a platform where creators learn to make short-form videos (UGC and clipping), join brand campaigns, post on their own social accounts, and get paid for the views their videos earn. This redesign of the website speaks to both creators and brands: it makes the offer clear at a glance, explains the journey from learning to payout, and builds enough trust for visitors to sign up with confidence.',
    goals: [
      "Communicate the value proposition within seconds: learn, create, and get paid",
      "Simplify the journey (learn, pick a campaign, post, connect an account, get paid) so first-time creators know exactly what to do",
      "Build trust with social proof such as press features, testimonials, and creator and brand stories",
      "Provide clear, prominent calls to action for both creators and brands",
      "Keep the experience responsive across mobile and desktop"
    ],
    takeaways:
      'Redesigning a platform that serves two audiences, creators and brands, taught me to lead with one clear message and let secondary content support it. Gamified elements like ranks work best when the rules are easy to scan, and trust signals placed next to calls to action reduce hesitation.',
    gallery: ['/projects/sema-1.webp', '/projects/sema-2.webp', '/projects/sema-3.webp'],
  },
];