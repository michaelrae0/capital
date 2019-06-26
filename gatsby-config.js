const chalk = require('chalk');
let contentfulConfig;

try {
  // attempt to get the contetnful config from .contentful.json
  contentfulConfig = require('./.contentful')
} catch (_) {}

// If we have env variables, use them over the values set in the .contentful.json
contentfulConfig = {
  spaceId: process.env.CONTENTFUL_SPACE_ID || contentfulConfig.spaceId,
  accessToken: process.env.CONTENTFUL_DELIVERY_TOKEN || contentfulConfig.accessToken,
  site_slug: process.env.CONTENTFUL_SITE_SLUG || 'holdings',
  downloadLocal: true,
};

const GOOGLE_ANALYTICS = process.env.GOOGLE_ANALYTICS_CODE || '';
const { spaceId, accessToken } = contentfulConfig;

if (!spaceId || !accessToken) {
  throw new Error(`Contentful spaceId and the accessToken need to be provided. Please run ${chalk.red('`yarn setup`')}.`)
}

module.exports = {
  siteMetadata: {
    title: `1251 Capital Group`,
    titleTemplate: `%s - 1251 Capital Group`,
    description: `1251 Capital is an experienced partner who can provide the strategic resources necessary
    to accelerate growth and maximize profitability.`,
    url: "https://1251-capital.com",
    siteUrl: `https://1251-capital.com`,
    image: "/images/logo-color.png",
    author: `Weston Baker`,
    twitterUsername: ``,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-remark`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-contentful`,
      options: contentfulConfig,
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /images\/svg/
        }
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `1251-capital-group`,
        short_name: `1251-capital`,
        start_url: `/`,
        background_color: `#E9EDF4`,
        theme_color: `#C6DAFF`,
        display: `minimal-ui`,
        icon: `src/images/favicon.png`, // This path is relative to the root of the site.
      },
    },
    'gatsby-plugin-offline',
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: GOOGLE_ANALYTICS,
        head: false,
        anonymize: true,
        respectDNT: true,
      },
    },
  ],
}
