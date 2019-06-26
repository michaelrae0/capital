import React from 'react'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import * as list from './featureList.module.scss'
import Feature from '../../components/Feature'
import Container from '../../components/Container'
import Row from '../../components/Row'
import { H5 }  from '../../components/Typography'

export default class FeatureListModule extends React.Component {

  static propTypes = {
    title: PropTypes.string,
    features: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string,
      icon: PropTypes.object,
    }))
  }

  render() {
    const {features, title} = this.props;

    const formattedFeatures = features.map(feature => {
      return {
        headline: feature.title,
        icon: feature.icon.file.url,
      }
    });

    const mappedFeatures = formattedFeatures.map( feature => (
      <Feature 
        headline={feature.headline}
        icon={feature.icon}
        key={feature.headline}
      />
    ));

    return (
      <section className={list.section}>
        <Container >
          <H5 text={title} className={classnames(list.title)} bold />
          <Row className={list.row} wrap>
            {mappedFeatures}
          </Row>
        </Container>
      </section>
    )
  }
}

export const query = graphql`
  fragment FeatureList on ContentfulModuleFeatureList {
    title
    slug
    features {
      id
      title
      slug
      icon {
        file {
          url
        }
      }
    }
  }
`
