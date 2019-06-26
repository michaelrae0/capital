import React from 'react'
import propTypes from 'prop-types'
import classnames from 'classnames'

import * as contact from './contactLocation.module.scss'
import { H1 } from '../Typography/index'

export default class ContactLocation extends React.Component {
  static propTypes = {
    title: propTypes.string,
    address: propTypes.string,
    photo: propTypes.string,
    directionsUrl: propTypes.string,
  }
  
  static defaultProps = {
    title: 'Ottawa-df',
    address: '46 Elgin Street | Suite 101\nOttawa, Ontario, Canada K1P 5K6\n613 421 1989-df',
    photo: 'http://placeimg.com/300/200/arch/grayscale',
    directionsUrl: 'https://google.com'
  }
  
  render() {
    const { title, address, photo, directionsUrl } = this.props

    const formattedAddress = address.split('\n').join('</br>')

    let isOffset = false;
    if (title === 'Boston') isOffset = true;

    return (
        <div className={classnames(contact.component, contact.col4, contact.fade_in_bottom_delay)}>
          <div className={classnames(contact.image_wrapper)} >
            <div className={classnames(contact.image, { [contact.offset]: isOffset }, 'background_image')} style={{ backgroundImage: `url(${photo})` }}></div>
            <H1 className={contact.title} text={title}/>
          </div>

          <div className={contact.address_container}>
            <div dangerouslySetInnerHTML={{__html: formattedAddress}} className={classnames(contact.remark_content, contact.address_text)} />
            <a href={directionsUrl} className={classnames(contact.directions_link, contact.remark_content, contact.address_text)} target="_blank" rel="noopener noreferrer" >
              Directions
            </a>
          </div>
        </div>
    )
  }
}