import React from 'react'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'

import * as cardsStyles from './cards.module.scss'
import Container from '../../components/Container'
import Row from '../../components/Row'
import Card from '../../components/Card'

export default class Cards extends React.Component {
  static propTypes = {
    cards: PropTypes.array,
    title: PropTypes.string,
    slug: PropTypes.string,
  }
  static defaultProps = {
    cards: [
      { title: '1251 Asset Management', url: '/', image: null },
      { title: '1251 Insurance', url: '/', image: null },
    ]
  }
  render() {
    const { cards } = this.props;

    const formattedCards= cards.map(card => ({
      title: card.title,
      siteUrl: card.url,
      image: card.image ? card.image.file.url : null,
    }))
    
    return (
      <section className={cardsStyles.section}>
        <Container>
          <Row className={cardsStyles.row} wrap>
            {formattedCards.map( card => (
              <Card {...card} />
            ))}
          </Row>
        </Container>
      </section>
    )
  }
}

export const query = graphql`
  fragment Cards on ContentfulModuleCards {
    slug
    title
    cards {
      title
      slug
      url 
      image {
        file {
          url
        }
      }
    }
  }
`