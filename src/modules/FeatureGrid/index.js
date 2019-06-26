import React from 'react'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import * as grid from './featureGrid.module.scss'
import Feature from '../../components/Feature'
import Container from '../../components/Container'
import Row from '../../components/Row'
import { H5 }  from '../../components/Typography'

export default class FeatureGridModule extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    features: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      icon: PropTypes.object.isRequired,
      body: PropTypes.object.isRequired,
    })),
  }

  render() {
    const { title, features } = this.props;

    const formattedFeatures = features.map(feature => {
      return {
        headline: feature.title,
        body: feature.body ? feature.body.childMarkdownRemark.html : '',
        icon: feature.icon ? feature.icon.file.url : '',
      }
    });

    const mappedFeatures = formattedFeatures.map( feature => (
      <Feature 
        headline={feature.headline}
        body={feature.body}
        icon={feature.icon}
        key={feature.headline}
        gridEnabled
      />
    ));


    return (
      <section className={grid.section} >
        <Container className={grid.container} >
          <H5 text={title} className={classnames(grid.title)} />
          <Row wrap>
            {mappedFeatures}
          </Row>
        </Container>
      </section>
    )
  }
}

export const query = graphql`
  fragment FeatureGrid on ContentfulModuleFeatureGrid {
    title
    slug
    features {
      id
      title
      slug
      body {
        childMarkdownRemark {
          html
        }
      }
      icon {
        file {
          url
        }
      }
    }
  }
`