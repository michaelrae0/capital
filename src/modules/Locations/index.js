import React from 'react'
import { graphql } from 'gatsby'
import propTypes from 'prop-types'

import * as locs from './locations.module.scss'
import ContactLocation from '../../components/ContactLocation/index'
import Row from '../../components/Row/index'


export default class Locations extends React.Component {
  static propTypes = {
    title: propTypes.string,
    slug: propTypes.string,
    directionsUrl: propTypes.string,
  }
  
  render() {
    const locations = this.props.locations;

    const mappedLocations = locations.map( location => {
      let { attachment, address, ...attributes } = location;
      const photo = attachment.file.url;
      address = address.childMarkdownRemark.html;
      
      return (
        <ContactLocation {...attributes} photo={photo} address={address} />
      )
    })

    return (
      <section className={locs.section} >
        <Row noMargin wrap >
          {mappedLocations}
        </Row>
      </section>
    )
  }
}

export const query = graphql`
  fragment LocationsModule on ContentfulModuleLocations {
    locations {
      title
      slug
      attachment {
        file {
          url
        }
      }
      address {
        childMarkdownRemark {
          html
        }
      }
      directionsUrl
    }
  }
`