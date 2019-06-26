import React from 'react'
import propTypes from 'prop-types'
import classnames from 'classnames'

import {  H3, H4 } from '../Typography/index'
import { formatDate } from '../../utils/date'

import * as article from './newsArticle.module.scss'

export default class NewsArticle extends React.Component {
  static propTypes = {
    title: propTypes.string,
    publishDate: propTypes.string
  }
  static defaultProps = {
    title: 'Emerald Asset Management and 1251 Capital Group Complete Partnership Transaction',
    publishDate: '2018-02-08T00:00-04:00'
  }

  render() {
    const { title, publishDate, className, url } = this.props;
    const formattedPublishDate = formatDate(publishDate);

    return (
      <a className={classnames(article.component, className)} href={url} target="_blank" rel="noopener noreferrer">
        <H3 text={title} className={classnames(article.title)} />
        <H4 text={formattedPublishDate} className={classnames(article.publishDate)} />
      </a>
    )
  }
}