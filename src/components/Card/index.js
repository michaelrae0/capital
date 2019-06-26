import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

import { H2 } from '../Typography/index'

import * as card from './card.module.scss'

export default class Card extends React.Component {
  static propTypes ={
    title: PropTypes.string.isRequired,
    siteUrl: PropTypes.string,
    image: PropTypes.string,
  }
  
  static defaultProps = {
    title: '1251 Asset Management',
    siteUrl: '/',
    image: 'http://placeimg.com/640/480/arch/grayscale',
  }
  
  render() {
    const { title, siteUrl, image } = this.props;
    const backgroundImage = `url(${image})`;

    return (
      <a href={siteUrl} className={classnames(card.item)} target="_blank" rel="noopener noreferrer">
        <div className={card.image_wrapper} >
          <div className={classnames(card.image)} style={{ backgroundImage }} />
        </div>

        <div className={card.text_container}>
          <H2 text={title} className={classnames(card.title)} />
        </div>
      </a>
    )
  }
}