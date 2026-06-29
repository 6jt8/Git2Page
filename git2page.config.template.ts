// git2page.config.template.ts
// Empty template — copy this file to git2page.config.ts and fill in your data
// See git2page.config.example.ts for a filled example with all options

const CONFIG = {
  github: {
    username: '', // Your GitHub org/user name. (This is the only required config)
  },
  /**
   * If you are deploying to https://<USERNAME>.github.io/, for example your repository is at https://github.com/username/username.github.io, set base to '/'.
   * If you are deploying to https://<USERNAME>.github.io/<REPO_NAME>/,
   * for example your repository is at https://github.com/username/MyPortfolio, then set base to '/MyPortfolio/'.
   */
  base: '/',
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
          projects: [], // These projects will not be displayed. example: ['username/project1', 'username/project2']
        },
      },
      manual: {
        // Properties for manually specifying projects
        projects: [], // List of repository names to display. example: ['username/project1', 'username/project2']
      },
    },
    external: {
      header: 'My Projects',
      // To hide the `External Projects` section, keep it empty.
      projects: [
        // {
        //   title: 'Project Name',
        //   description: 'A brief description of the project.',
        //   imageUrl: 'https://example.com/image.png',
        //   link: 'https://example.com',
        // },
      ],
    },
  },
  seo: {
    title: '', // Your name or site title
    description: '', // Short description for SEO
    imageURL: '', // Open Graph image URL
  },
  social: {
    linkedin: '', // LinkedIn username
    x: '', // X/Twitter username
    mastodon: '', // Mastodon handle (e.g. 'user@mastodon.social')
    researchGate: '', // ResearchGate username
    facebook: '', // Facebook username
    instagram: '', // Instagram username
    reddit: '', // Reddit username
    threads: '', // Threads username
    youtube: '', // YouTube channel (e.g. '@channel')
    udemy: '', // Udemy username
    dribbble: '', // Dribbble username
    behance: '', // Behance username
    medium: '', // Medium username
    dev: '', // Dev.to username
    stackoverflow: '', // Stack Overflow user ID
    discord: '', // Discord server invite code (e.g. 'abc123') or full invite URL
    telegram: '', // Telegram username
    website: '', // Your website URL
    phone: '', // Phone number
    email: '', // Email address
  },
  resume: {
    fileUrl: '', // Resume PDF URL. Empty hides the download button.
  },
  skills: [
    // 'JavaScript',
    // 'React',
    // 'TypeScript',
  ],
  experiences: [
    // {
    //   company: 'Company Name',
    //   position: 'Job Title',
    //   from: 'January 2023',
    //   to: 'Present',
    //   companyLink: 'https://company.com',
    // },
  ],
  certifications: [
    // {
    //   name: 'Certification Name',
    //   body: 'Issuing Organization',
    //   year: '2023',
    //   link: 'https://credential.url',
    // },
  ],
  educations: [
    // {
    //   institution: 'University Name',
    //   degree: 'B.Sc. Computer Science',
    //   from: '2019',
    //   to: '2023',
    // },
  ],
  publications: [
    // {
    //   title: 'Paper Title',
    //   conferenceName: '', // Conference name (or leave empty)
    //   journalName: 'Journal Name', // Journal name (or leave empty)
    //   authors: 'Author One, Author Two',
    //   link: 'https://doi.org/...',
    //   description: 'A brief description of the publication.',
    // },
  ],
  // Display articles from your medium or dev account. (Optional)
  blog: {
    source: 'dev', // 'medium' | 'dev'
    username: '', // Your blog username. Empty hides the section.
    limit: 2, // How many articles to display. Max is 10.
  },
  googleAnalytics: {
    id: '', // GA3 tracking id/GA4 tag id UA-XXXXXXXXX-X | G-XXXXXXXXXX
  },
  // Track visitor interaction and behavior. https://www.hotjar.com
  hotjar: {
    id: '', // Hotjar site ID
    snippetVersion: 6,
  },
  themeConfig: {
    defaultTheme: 'lofi', // Default theme on first visit

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

  enablePWA: true, // Enable/disable Progressive Web App support
};

export default CONFIG;
