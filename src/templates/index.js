import React from "react"
import { graphql } from "gatsby"

import Layout from "../layout"
import SEO from "../components/seo"
import Module from "../components/Module";

const IndexPage = ({ data, pageContext }) => {
  const renderModules = (modules) => {
    return modules.map((module) => {
      const {__typename, ...attributes} = module;
      return <Module attributes={attributes} type={__typename} key={__typename} />
    })
  }

  const { modules } = data.contentfulPage;
  
  return (
    <Layout {...pageContext} >
      <SEO title={data.contentfulPage.title} titleTemplate={`%s - ${pageContext.siteTitle}`}/>
      { modules && renderModules(modules) }
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query ($slug: String!) {
    contentfulPage (slug:{eq: $slug}) {
      title
      slug
      modules {
        __typename
        ...CoverModule
        ...FeatureGrid
        ...FeatureList
        ...CallToActionModule
        ...LocationsModule
        ...Content
        ...News
        ...TeamMembers
        ...Affiliates
        ...LandingPage
        ...Cards
      }
    }
  } 
  
`