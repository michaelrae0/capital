import React from 'react'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'

import Cover from '../../components/Cover/index'

export default class CoverModule extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    slug: PropTypes.string,
    body: PropTypes.object,
    backgroundImage: PropTypes.object,
    style: PropTypes.bool,
    hasOverlay: PropTypes.bool,
    displayScrollDown: PropTypes.bool,
    alignedVertical: PropTypes.bool,
    reducedHeight: PropTypes.bool,
  }

  render() {
    const {body, backgroundImage, ...attributes} = this.props;
    const bodyContent = body ? body.childMarkdownRemark.html : null;
    const backgroundUrl = backgroundImage ? backgroundImage.file.url : null;

    return (
      <Cover {...attributes} backgroundImage={backgroundUrl} body={bodyContent &&  <div dangerouslySetInnerHTML={{ __html: bodyContent }} />} />
    )
  }
}

export const query = graphql`
  fragment CoverModule on ContentfulModuleCover {
    title
    slug
    style
    displayScrollDown
    reducedHeight
    alignedVertical
    body {
      childMarkdownRemark {
        html
      }
    }
    hasOverlay
    backgroundImage {
      file {
        url
      }
    }
  }
`
