// git2page.config.example.ts
// Example configuration with sample data — copy this to git2page.config.ts and replace with your own data

const CONFIG = {
  github: {
    username: 'johndoe', // Your GitHub org/user name. (This is the only required config)
  },
  /**
   * If you are deploying to https://<USERNAME>.github.io/, for example your repository is at https://github.com/johndoe/johndoe.github.io, set base to '/'.
   * If you are deploying to https://<USERNAME>.github.io/<REPO_NAME>/,
   * for example your repository is at https://github.com/johndoe/MyPortfolio, then set base to '/MyPortfolio/'.
   */
  base: '/MyPortfolio/',
  projects: {
    github: {
      display: true, // Display GitHub projects?
      header: 'Github Projects',
      mode: 'automatic', // Mode can be: 'automatic' or 'manual'
      automatic: {
        sortBy: 'stars', // Sort projects by 'stars' or 'updated'
        limit: 8, // How many projects to display.
        exclude: {
          forks: false, // Forked projects will not be displayed if set to true.
          projects: [], // These projects will not be displayed. example: ['johndoe/my-project1', 'johndoe/my-project2']
        },
      },
      manual: {
        // Properties for manually specifying projects
        projects: ['johndoe/repo1', 'johndoe/repo2'], // List of repository names to display.
      },
    },
    external: {
      header: 'My Projects',
      // To hide the `External Projects` section, keep it empty.
      projects: [
        {
          title: 'Project Alpha',
          description:
            'A modern web application built with React and TypeScript for real-time data visualization.',
          imageUrl:
            'https://img.freepik.com/free-vector/illustration-gallery-icon_53876-27002.jpg',
          link: 'https://example.com',
        },
        {
          title: 'Project Beta',
          description:
            'An open-source CLI tool that automates deployment workflows and reduces manual overhead.',
          imageUrl:
            'https://img.freepik.com/free-vector/illustration-gallery-icon_53876-27002.jpg',
          link: 'https://example.com',
        },
      ],
    },
  },
  seo: {
    title: 'John Doe - Portfolio',
    description:
      'Full Stack Developer specializing in React, TypeScript, and Cloud Architecture.',
    imageURL: 'https://example.com/og-image.png',
  },
  social: {
    linkedin: 'johndoe',
    x: 'johndoe',
    mastodon: 'johndoe@mastodon.social',
    researchGate: 'John_Doe',
    facebook: 'johndoe',
    instagram: 'johndoe',
    reddit: 'johndoe',
    threads: 'johndoe',
    youtube: '@johndoe',
    udemy: 'johndoe',
    dribbble: 'johndoe',
    behance: 'johndoe',
    medium: 'johndoe',
    dev: 'johndoe',
    stackoverflow: '12345678',
    discord: 'abc123invite', // Discord server invite code (e.g. 'abc123') or full invite URL
    telegram: 'johndoe',
    website: 'https://johndoe.com',
    phone: '+1234567890',
    email: 'john@example.com',
  },
  resume: {
    fileUrl:
      'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', // Empty fileUrl will hide the `Download Resume` button.
  },
  skills: [
    'TypeScript',
    'React',
    'Node.js',
    'Python',
    'PostgreSQL',
    'Docker',
    'AWS',
    'Tailwind CSS',
    'GraphQL',
    'Rust',
  ],
  experiences: [
    {
      company: 'Acme Corporation',
      position: 'Senior Software Engineer',
      from: 'September 2021',
      to: 'Present',
      companyLink: 'https://example.com',
    },
    {
      company: 'Globex Industries',
      position: 'Full Stack Developer',
      from: 'July 2019',
      to: 'August 2021',
      companyLink: 'https://example.com',
    },
  ],
  certifications: [
    {
      name: 'AWS Certified Solutions Architect',
      body: 'Amazon Web Services',
      year: 'March 2022',
      link: 'https://example.com',
    },
  ],
  educations: [
    {
      institution: 'University of Technology',
      degree: 'B.Sc. Computer Science',
      from: '2015',
      to: '2019',
    },
    {
      institution: 'Community College',
      degree: 'A.S. Software Engineering',
      from: '2012',
      to: '2014',
    },
  ],
  publications: [
    {
      title: 'Scalable Microservices Architecture',
      conferenceName: '',
      journalName: 'Journal of Software Engineering',
      authors: 'John Doe, Jane Smith',
      link: 'https://example.com',
      description:
        'This paper explores patterns for building resilient microservices at scale, covering service discovery, circuit breakers, and observability strategies.',
    },
  ],
  // Display articles from your medium or dev account. (Optional)
  blog: {
    source: 'dev', // medium | dev
    username: 'johndoe', // to hide blog section, keep it empty
    limit: 3, // How many articles to display. Max is 10.
  },
  googleAnalytics: {
    id: 'G-XXXXXXXXXX', // GA3 tracking id/GA4 tag id UA-XXXXXXXXX-X | G-XXXXXXXXXX
  },
  // Track visitor interaction and behavior. https://www.hotjar.com
  hotjar: { id: '1234567', snippetVersion: 6 },
  themeConfig: {
    defaultTheme: 'dracula',

    // Hides the switch in the navbar
    // Useful if you want to support a single color mode
    disableSwitch: false,

    // Should use the prefers-color-scheme media-query,
    // using user system preferences, instead of the hardcoded defaultTheme
    respectPrefersColorScheme: false,

    // Display the ring in Profile picture
    displayAvatarRing: true,

    // Available themes. To remove any theme, exclude from here.
    themes: [
      'light',
      'dark',
      'cupcake',
      'bumblebee',
      'emerald',
      'corporate',
      'synthwave',
      'retro',
      'cyberpunk',
      'valentine',
      'halloween',
      'garden',
      'forest',
      'aqua',
      'lofi',
      'pastel',
      'fantasy',
      'wireframe',
      'black',
      'luxury',
      'dracula',
      'cmyk',
      'autumn',
      'business',
      'acid',
      'lemonade',
      'night',
      'coffee',
      'winter',
      'dim',
      'nord',
      'sunset',
      'caramellatte',
      'abyss',
      'silk',
      'procyon',
      'aurora',
      'sakura',
      'terra',
      'noctis',
      'verdant',
    ],
  },

  // Optional Footer. Supports plain text or HTML.
  footer: `Made with <a
      class="text-primary" href="https://github.com/6jt8/Git2Page"
      target="_blank"
      rel="noreferrer"
    >Git2Page</a> and ❤️`,

  enablePWA: true,
};

export default CONFIG;
