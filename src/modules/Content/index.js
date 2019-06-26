import React from 'react'
import { graphql } from 'gatsby'
import propTypes from 'prop-types'
import classnames from 'classnames'

import * as content from './content.module.scss'
import Container from '../../components/Container'
import Row from '../../components/Row'
import { H1 } from '../../components/Typography'
import ScrollDown from '../../components/ScrollDown'

export default class Content extends React.Component {
  static propTypes = {
    title: propTypes.string,
    body: propTypes.object,
    displayScrollDown: propTypes.bool,
    reducedHeight: propTypes.bool,
  }

  render() {
    const { title, body, displayScrollDown, reducedHeight } = this.props;
    const html = body.childMarkdownRemark ? body.childMarkdownRemark.html : '<p>Query failed</p>';

    return (
      <section className={classnames(content.section, {[content.section__reduced]: reducedHeight})}>
        <Container className={content.container}>
          <Row className={content.row__title}>
            <H1 text={title} className={classnames(content.title)} />
          </Row>
          <Row className={content.row__body}>
            <div dangerouslySetInnerHTML={{__html: html}} className={classnames(content.body, {[content.body__reduced]: reducedHeight}, "remark-content")} />
          </Row>
        </Container>
        {displayScrollDown && <ScrollDown />}
      </section>
    )
  }
}

export const query = graphql`
  fragment Content on ContentfulModuleContent {
    title
    slug
    displayScrollDown
    reducedHeight
    body {
      childMarkdownRemark {
        html
      }
    }
  }
`