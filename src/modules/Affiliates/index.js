import React from 'react'
import { graphql } from 'gatsby'
import propTypes from 'prop-types'

import * as affs from './affiliates.module.scss'
import Affiliate from '../../components/Affiliate'
import Container from '../../components/Container'
import Row from '../../components/Row'

export default class Affiliates extends React.Component {
  static propTypes = {
    affiliates: propTypes.arrayOf(propTypes.shape({
      id: propTypes.string,
      logo: propTypes.object,
    })),
  }
  
  render() {
    const { affiliates } = this.props;

    // Format data in a simpler structure.
    const formattedAffiliates = affiliates.map( affiliate => ({
      id: affiliate.id,
      image: affiliate.logo ? affiliate.logo.file.url : 'https://via.placeholder.com/150.png?text=Image+Not+Found',
      title: affiliate.title,
      perRow: 3,
      key: affiliate.id,
      ...(affiliate.body && {body: affiliate.body}),
      ...(affiliate.location && {location: affiliate.location}),
      ...(affiliate.leadership && {leadership: affiliate.leadership}),
      ...(affiliate.investmentYear && {investmentYear: affiliate.investmentYear}),
      ...(affiliate.url && {url: affiliate.url}),
    }))

    return (
      <section className={affs.section}>
        <Container>
          <Row className={affs.row} wrap>
            {formattedAffiliates.map( affiliate => <Affiliate {...affiliate} /> )}
          </Row>
        </Container>
      </section>
    )
  }
}

export const query = graphql`
  fragment Affiliates on ContentfulModuleAffiliates {
    slug
    affiliates {
      id
      slug
      title
      location
      leadership
      investmentYear
      url
      body {
        childMarkdownRemark {
          html
        } 
      }
      logo {
        file {
          url
        }
      }
    }
  }
`