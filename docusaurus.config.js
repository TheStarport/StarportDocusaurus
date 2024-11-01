// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const {
  faList, faInbox,
  faUser, faUsers, faDownload,
  faNewspaper, faBookOpen
} = require('@fortawesome/free-solid-svg-icons');

const {
  faGithub, faDiscord
} = require('@fortawesome/free-brands-svg-icons');

const {
  faClock
} = require('@fortawesome/free-regular-svg-icons');

/** @type {import('@docusaurus/types').Config} */

module.exports = async function createConfigAsync() {
  return {
    title: 'The Starport',
    tagline: 'A collection of all knowledge amassed for the Space Game',
    favicon: 'img/favicon.ico',

    // Set the production url of your site here
    url: 'https://the-starport.com',
    // Set the /<baseUrl>/ pathname under which your site is served
    // For GitHub pages deployment, it is often '/<projectName>/'
    baseUrl: '/',

    onBrokenLinks: 'warn',
    onBrokenMarkdownLinks: 'warn',

    staticDirectories: [
      "static",
      "wiki-docs/static",
      "blogs/static"
    ],

    clientModules: [
      require.resolve('./blogs/random-avatars.ts')
    ],

    // Even if you don't use internalization, you can use this field to set useful
    // metadata like html lang. For example, if your site is Chinese, you may want
    // to replace "en" with "zh-Hans".
    i18n: {
      defaultLocale: 'en',
      locales: ['en'],
    },

    presets: [
      [
        'classic',
        /** @type {import('@docusaurus/preset-classic').Options} */
        ({
          docs: {
            sidebarPath: require.resolve('./sidebars.js'),
            editUrl: (params) => 'https://github.com/TheStarport/KnowledgeBase/tree/master/docs/' + params.docPath,
            routeBasePath: '/wiki',
            path: './wiki-docs/docs',
            remarkPlugins: [(await import('remark-math')).default],
            rehypePlugins: [(await import('rehype-katex')).default]
          },
          blog: {
            showReadingTime: true,
            blogSidebarCount: 10,
            blogTitle: 'The Starport Blog',
            routeBasePath: '/blog',
            path: './blogs/content'
          },
          theme: {
            customCss: [
              require.resolve('./CSS/global.scss')
            ]
          },
        }),
      ],
    ],
    stylesheets: [
      {
        href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
        type: 'text/css',
        integrity:
          'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
        crossorigin: 'anonymous',
      },
    ],

    themeConfig:
      /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
      ({
        navbar: {
          title: 'The Starport',
          items: [
            {
              to: 'https://the-starport.com/forums/categories',
              target: '_self',
              label: 'Categories',
              position: 'left',
              faIcon: faList
            },
            {
              to: 'https://the-starport.com/forums/unread',
              target: '_self',
              label: 'Unread',
              position: 'left',
              faIcon: faInbox
            },
            {
              to: 'https://the-starport.com/forums/recent',
              target: '_self',
              label: 'Recent',
              position: 'left',
              faIcon: faClock
            },
            {
              to: 'https://the-starport.com/forums/users',
              target: '_self',
              label: 'Users',
              position: 'left',
              faIcon: faUser
            },
            {
              to: 'https://the-starport.com/forums/groups',
              target: '_self',
              label: 'Groups',
              position: 'left',
              faIcon: faUsers
            },
            {
              to: 'https://the-starport.com/forums/downloads',
              target: '_self',
              label: 'Download Archive',
              position: 'left',
              faIcon: faDownload
            },
            {
              to: 'https://the-starport.com/blog',
              target: '_self',
              label: 'Starport Blog',
              position: 'left',
              faIcon: faNewspaper
            },
            {
              to: 'https://the-starport.com/wiki/',
              target: '_self',
              label: 'Knowledge Base',
              position: 'left',
              faIcon: faBookOpen
            },
            {
              to: 'https://github.com/TheStarport',
              target: '_self',
              label: 'The Forge',
              position: 'left',
              faIcon: faGithub
            },
            {
              to: 'https://the-starport.com/discord',
              target: '_self',
              label: 'Discord',
              position: 'left',
              faIcon: faDiscord
            }
          ],
        },
        colorMode: {
          defaultMode: 'dark',
          disableSwitch: true,
          respectPrefersColorScheme: false,
        },
        prism: {
          theme: require("prism-react-renderer/themes/vsDark"),
          additionalLanguages: ['ini', 'mermaid', 'cpp', 'csharp', 'pascal', 'maxscript', 'markdown', 'lua']
        },
        algolia: {
          // The application ID provided by Algolia
          appId: 'UJL7MO0C52',

          // Public API key: it is safe to commit it
          apiKey: '7273ca101cdbada512274a0f6bbd3af0',

          indexName: 'the-starport',
          contextualSearch: false,

          // Optional: Algolia search parameters
          searchParameters: {},

          // Optional: path for search page that enabled by default (`false` to disable it)
          searchPagePath: 'search'
        },
      }),
    markdown: {
      mermaid: true
    },
    themes: [
      "@docusaurus/theme-mermaid"
    ],
    plugins: [
      'docusaurus-plugin-sass'
    ]
  };

};

