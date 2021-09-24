/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

module.exports = {
  title: 'v5 Documentation',
  tagline:
    'T-SOFT v5 standart temasına ait tüm detayları bulabileceğiniz dökümantasyon.',
  url: 'https://v5-doc.netlify.app/',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'T-SOFT',
  projectName: 'T-SOFT v5 Documentation',
  themes: ['@docusaurus/theme-live-codeblock'],
  plugins: ['my-loaders'], // loader required for .svg
  themeConfig: {
    algolia: {
      apiKey: '74cc71d8c788370343b734750c915540',
      indexName: 'docusaurus',
      appId: 'D3CV9EU7VN',
    },
    navbar: {
      logo: {
        alt: 'T-SOFT',
        src: 'img/docsearch-logo.svg',
        srcDark: 'img/docsearch-logo-white.svg',
      },
      hideOnScroll: true,
      items: [
        {
          label: 'Documentation',
          to: 'docs/tr-introduction',
          position: 'right',
        }
      ],
    },
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    announcementBar: {
      id: 'supportus',
      content:
        '⭐️ v5 doc ⭐️',
    },
    footer: {
      logo: {
        alt: 'v5 Documentation',
        src: 'img/v5-logo.svg',
      },
      copyright: `v5 Documentation - Prepared by T-Soft E-Commerce.`,
    },
    image: 'img/og_image.png',
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
