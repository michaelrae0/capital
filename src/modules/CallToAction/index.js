import React from 'react'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import classnames from 'classnames'


import * as cta from './callToAction.module.scss'
import Cover from '../../components/Cover'
import ArrowAnchor from '../../components/ArrowAnchor'

export default class CallToActionModule extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    callToAction: PropTypes.string.isRequired,
    url: PropTypes.string,
    backgroundImage: PropTypes.object,
    supplemental: PropTypes.object,
  }

  render () {
    const { supplemental, backgroundImage, title, callToAction, url } = this.props;
    const backgroundImageUrl = backgroundImage ? backgroundImage.file.url : '';
    const rightContent = supplemental.childMarkdownRemark.html;

    return (
      <Cover
        title={title}
        backgroundImage={backgroundImageUrl}
        rightContent={<div className={classnames(cta.right_content, cta.remark_content)} dangerouslySetInnerHTML={{__html: rightContent}} />}
        style
      >
        <ArrowAnchor text={callToAction} url={url} className={cta.action_call} />
      </Cover>
    )
  }
}

export const query = graphql`
  fragment CallToActionModule on ContentfulModuleCallToAction {
    title
    slug
    callToAction
    url
    supplemental {
      childMarkdownRemark {
        html
      } 
    }
    backgroundImage {
      file {
        url
      }
    }
  }
`