import type { Dictionary } from './sr';

export const en: Dictionary = {
  site: {
    tagline: 'On the classroom and technology in teaching',
  },
  author: {
    role: 'QA engineer and primary school teacher',
    location: 'Banja Luka, Bosnia and Herzegovina',
    intro:
      'I trained as a primary school teacher and today I work in IT as a QA engineer. I spent eight months teaching first graders, and ever since I have been thinking about how technology can help in the classroom — and when it only gets in the way.',
    background: [
      {
        title: 'In IT',
        text: 'For more than six years I have worked as a QA engineer: testing web and mobile apps, automating tests and evaluating AI models. The job taught me not to take technology at its word — I check first whether it really works.',
      },
      {
        title: 'In the classroom',
        text: 'I studied primary education at the University of Banja Luka and spent eight months teaching first graders at Grahovo Primary School. There I saw how much teaching depends on clarity, patience and warmth — with or without technology.',
      },
    ],
  },
  topics: [
    { title: 'Life in the classroom', text: 'Experiences from first grade and ideas for primary teaching.' },
    {
      title: 'Technology in teaching',
      text: 'Tools and apps for teaching, checked through a tester’s eyes — what works and what doesn’t.',
    },
    { title: 'Artificial intelligence', text: 'How AI can help teachers, and where to be careful.' },
  ],
  nav: {
    label: 'Main navigation',
    home: 'Home',
    blog: 'Blog',
    about: 'About',
  },
  language: {
    label: 'Language',
    change: 'Change language',
  },
  theme: {
    toLight: 'Switch to light theme',
    toDark: 'Switch to dark theme',
  },
  footer: {
    label: 'Footer links',
    rights: 'All rights reserved.',
    author: 'Author',
    contact: 'Contact',
  },
  categories: {
    'AI alati u nastavi': 'AI tools in teaching',
    'Etika i AI': 'Ethics and AI',
    'Iskustva iz prakse': 'From the classroom',
    Vijesti: 'News',
    Resursi: 'Resources',
  },
  home: {
    greeting: 'Hi, I’m',
    readBlog: 'Read the blog',
    moreAboutMe: 'More about me',
    chips: ['Primary teaching', 'QA engineer', 'AI in education'],
    whoEyebrow: '01 — Who I am',
    whoTitle: 'Between the classroom and IT',
    topicsEyebrow: '02 — Topics',
    topicsTitle: 'What I write about',
    blogEyebrow: '03 — Blog',
    blogTitle: 'Latest from the blog',
  },
  blog: {
    eyebrow: 'Blog',
    title: 'All articles',
    allPosts: 'All articles',
    readMore: 'Read more',
    published: 'Published',
    backToBlog: 'Back to the blog',
    emptyTitle: 'No articles yet',
    emptyMessage: 'The first articles are on their way. Check back soon!',
    notFoundTitle: 'Article not found',
    notFoundMessage: 'The article you are looking for does not exist or has been moved.',
  },
  about: {
    title: 'About me',
    blogEyebrow: 'About the blog',
    blogTitle: 'What you’ll find here',
    blogText: (siteName: string) =>
      `${siteName} is where I bring together what I learned in the classroom and what I work on every day in IT.`,
    contactEyebrow: 'Contact',
    contactTitle: 'Get in touch',
    contactText: 'Questions, suggestions, an idea for a topic or just a hello — I’m happy to reply.',
    location: 'Location',
  },
  notFound: {
    eyebrow: 'Error',
    title: 'Page not found.',
    backHome: 'Back to home',
  },
};
