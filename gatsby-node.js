/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require('path');
const autoprefixer = require('autoprefixer');
const browserslist = require('browserslist');

// Webpack config so we can use CSS Grid Autoprefixer
// this is effecitvely the same as gatsby-plugin-postcss-sass, but
// with hard coded postcss values
exports.onCreateWebpackConfig = (
  { actions, stage, rules, plugins, loaders },
  { cssLoaderOptions = {}, postCssPlugins, ...sassOptions }
) => {
  const { setWebpackConfig } = actions
  const PRODUCTION = stage !== `develop`
  const isSSR = stage.includes(`html`)

  const sassLoader = {
    loader: require.resolve(`sass-loader`),
    options: {
      sourceMap: !PRODUCTION,
      ...sassOptions,
    },
  }

  const sassRule = {
    test: /\.s(a|c)ss$/,
    use: isSSR
      ? [loaders.null()]
      : [
          loaders.miniCssExtract(),
          loaders.css({ ...cssLoaderOptions, importLoaders: 2 }),
          loaders.postcss({ plugins: [
            autoprefixer({ 
              browsers: browserslist(),
              grid: true,
            })
          ] }),
          sassLoader,
        ],
  }
  const sassRuleModules = {
    test: /\.module\.s(a|c)ss$/,
    use: [
      !isSSR && loaders.miniCssExtract({ hmr: false }),
      loaders.css({ ...cssLoaderOptions, modules: true, importLoaders: 2 }),
      loaders.postcss({ plugins: postCssPlugins }),
      sassLoader,
    ].filter(Boolean),
  }

  let configRules = []

  switch (stage) {
    case `develop`:
    case `build-javascript`:
    case `build-html`:
    case `develop-html`:
      configRules = configRules.concat([
        {
          oneOf: [sassRuleModules, sassRule],
        },
      ])
      break
  }

  setWebpackConfig({
    module: {
      rules: configRules,
    },
  })
}

const contentful_site_slug = process.env.CONTENTFUL_SITE_SLUG;

exports.onCreatePage = ({page, actions}) => {
  const { createPage, deletePage } = actions;
  let {context} = page;
  context.site_slug = contentful_site_slug;

  deletePage(page);
  createPage({
    ...page,
    context,
  });
}

exports.createPages = async function({ graphql, actions }) {
  const { createPage } = actions;
  const template = path.resolve('./src/templates/index.js');

  await graphql(
    `
    query buildPages($slug: String!)
    {
      contentfulSiteConfig(slug: {eq: $slug}) {
        title
        pages {
          isHomePage
          slug
        }
        primaryNavigation {
          slug
          navItems {
            __typename 
            ... on ContentfulPage {
              slug
              isHomePage
              title
            }
            ... on ContentfulComponentNavigationItem {
              title
              slug
              url
              subNav {
                slug
                title
                url
              }
            }
          }
        }
        footerNavigation {
          slug
          navItems {
            __typename 
            ... on ContentfulPage {
              slug
              title
            }
            ... on ContentfulComponentNavigationItem {
              title
              slug
              url
            }
          } 
        }
        logo {
          id
          file {
            url
          }
        }
      }
    }
    `, {slug: contentful_site_slug}).then(result => {
    if (result.errors) {
      console.log(result.errors);
      reject(result.errors);
    }
    
    const pages = result.data.contentfulSiteConfig.pages;
    const {logo, primaryNavigation, footerNavigation, title} = result.data.contentfulSiteConfig;
    
    pages.forEach((page, index) => {
      pageSlug = page.isHomePage ? '/' : page.slug;
      createPage({
        path: `${pageSlug}`,
        component: template,
        context: {
          siteTitle: title,
          slug: page.slug,
          navigation: primaryNavigation,
          footerNavigation: footerNavigation,
          logoUrl: logo.file.url,
          logoId: logo.id,
        },
      })
    })
  })
}