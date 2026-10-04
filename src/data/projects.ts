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
    cover: '/projects/royaltech.png',
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
  },
  {
    slug: 'jumping-jack',
    title: 'Jumping Jack',
    category: 'Landing Page',
    cover: '/projects/jumpingjack.png',
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
    slug: 'jacks-cake-house',
    title: "Jack's Cake House",
    category: 'E-Commerce',
    cover: '/projects/cakehouse.png',
    short:
      'An e-commerce website for a premium bakery, from browsing to checkout.',
    overview:
      "Jack's Cake House is an e-commerce website designed for a premium bakery brand, providing a seamless experience from discovering products to completing online orders. Users can browse collections, customize cakes, manage their cart, and complete purchases.",
    goals: [
      "Design a website that reflects the bakery's premium brand identity",
      'Create an intuitive shopping experience from product discovery to checkout',
      'Simplify the cake customization and ordering process',
    ],
    takeaways:
      'This project highlighted the importance of information hierarchy, intuitive purchasing flows, and reducing friction throughout the customer journey to create a shopping experience that is both enjoyable and efficient.',
  },
  {
    slug: 'lms-dashboard',
    title: 'LMS Dashboard',
    category: 'Web Dashboard',
    cover: '/projects/lms.png',
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
    cover: '/projects/satuintegritas.png',
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
];