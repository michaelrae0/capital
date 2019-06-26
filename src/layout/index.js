import React from "react";
import PropTypes from "prop-types";
import { graphql, StaticQuery } from "gatsby";
import classnames from "classnames";

import Header from "../components/Header"
import Footer from "../components/Footer"
import "../styles/app.scss"

class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    data: PropTypes.shape({
      site: PropTypes.shape({
        siteMetadata: PropTypes.shape({
          title: PropTypes.string.isRequired,
        }),
      }),
    }),
    logoUrl: PropTypes.string,
    navigation: PropTypes.shape({
      slug: PropTypes.string.isRequired,
      navItems: PropTypes.arrayOf(PropTypes.shape({
        slug: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        url: PropTypes.string,
      })),
    }),
    footerNavigation: PropTypes.shape({
      slug: PropTypes.string.isRequired,
      navItems: PropTypes.arrayOf(PropTypes.shape({
        slug: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        url: PropTypes.string,
      })),
    })
  }

  render() {
    const { 
      children, 
      logoUrl, 
      navigation,
      footerNavigation,
      data,
    } = this.props;
    
    return (
        <>
          <Header logoUrl={logoUrl} navigation={navigation} company={data.site.siteMetadata.title} />
          <main className={classnames('site__main')}>
            {children}
          </main>
          <Footer company={data.site.siteMetadata.title} navigation={footerNavigation}></Footer>
        </>
    )
  }
}

export default props => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => <Layout data={data} {...props} />}
  />
)
