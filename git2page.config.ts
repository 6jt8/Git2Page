// git2page.config.ts
// Your personal configuration — replace values with your own data

const CONFIG = {
  github: {
    username: '6jt8', // Your GitHub org/user name. (This is the only required config)
  },
  /**
   * If you are deploying to https://<USERNAME>.github.io/, for example your repository is at https://github.com/6jt8/6jt8.github.io, set base to '/'.
   * If you are deploying to https://<USERNAME>.github.io/<REPO_NAME>/,
   * for example your repository is at https://github.com/6jt8/Git2Page, then set base to '/Git2Page/'.
   */
  base: '/Git2Page/',
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
          projects: ['6jt8/6jt8'], // These projects will not be displayed. example: ['6jt8/my-project1', '6jt8/my-project2']
        },
      },
      manual: {
        // Properties for manually specifying projects
        projects: [], // List of repository names to display. example: ['6jt8/my-project1', '6jt8/my-project2']
      },
    },
    external: {
      header: 'My Projects',
      // To hide the `External Projects` section, keep it empty.
      projects: [],
    },
  },
  seo: { title: '', description: '', imageURL: '' },
  social: {
    linkedin: '',
    x: '',
    mastodon: '',
    researchGate: '',
    facebook: '',
    instagram: '',
    reddit: '',
    threads: '',
    youtube: '',
    udemy: '',
    dribbble: '',
    behance: '',
    medium: '',
    dev: '',
    stackoverflow: '',
    discord: '7yhR9RekC5', // Discord server invite code (e.g. 'abc123') or full invite URL
    telegram: '',
    website: '',
    phone: '',
    email: '',
  },
  resume: {
    fileUrl: '', // Empty fileUrl will hide the `Download Resume` button.
  },
  skills: [
    'React',
    'TypeScript',
    'Vite',
    'Tailwind CSS',
    'PostCSS',
    'Node.js',
    'Bun',
    'ElysiaJS',
    'Fastify',
    'REST APIs',
    'WebSockets',
    'Python',
    'PyTorch',
    'Hugging Face',
    'LangGraph',
    'CrewAI',
    'FastAPI',
    'Rust',
    'WebAssembly',
    'Neon',
    'PyO3',
    'Docker',
    'Docker Compose',
    'PostgreSQL',
    'Qdrant',
    'ESLint',
    'Prettier',
    'Vitest',
  ],
  experiences: [],
  certifications: [],
  educations: [],
  publications: [],
  // Display articles from your medium or dev account. (Optional)
  blog: {
    source: 'dev', // medium | dev
    username: '', // to hide blog section, keep it empty
    limit: 2, // How many articles to display. Max is 10.
  },
  googleAnalytics: {
    id: '', // GA3 tracking id/GA4 tag id UA-XXXXXXXXX-X | G-XXXXXXXXXX
  },
  // Track visitor interaction and behavior. https://www.hotjar.com
  hotjar: { id: '', snippetVersion: 6 },
  themeConfig: {
    defaultTheme: 'night',

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
