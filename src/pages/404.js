import React from "react"
import classnames from "classnames"
import {graphql} from "gatsby";

import * as error from './404.module.scss'
import Layout from "../layout"
import SEO from "../components/seo"
import {H1} from '../components/Typography';
import Container from '../components/Container'
import Row from '../components/Row'

const NotFoundPage = ({data, pageContext}) => {
  const {contentfulSiteConfig} = data;
  const context = {
    navigation: contentfulSiteConfig.primaryNavigation,
    footerNavigation: contentfulSiteConfig.footerNavigation,
    logoUrl: contentfulSiteConfig.logo.file.url,
    logoId: contentfulSiteConfig.logo.id,
  };

  return (
    <Layout {...context} >
      <SEO title="404: Not found" />
      <section className={error.section}>
        <Container className={error.container}>
          <Row className={error.row__title}>
            <H1 text="Page Not Found - Error 404" className={classnames(error.title)} />
          </Row>
          <Row className={error.row__body}>
            <div className={classnames(error.body, "remark-content")}>
              <p>We apologize, unfortunately we couldn’t find the page you were looking for.</p>
            </div>
          </Row>
        </Container>
      </section>
    </Layout>
  )
}

export default NotFoundPage

export const query = graphql`
  query buildPages($site_slug: String!)
    {
      contentfulSiteConfig(slug: {eq: $site_slug}) {
        title
        pages {
          slug
        }
        primaryNavigation {
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
  `