import React from 'react'
import { graphql } from 'gatsby'
import propTypes from 'prop-types'

import * as team from './teamMembers.module.scss'
import Container from '../../components/Container'
import Row from '../../components/Row'
import TeamMember from '../../components/TeamMember'

export default class Team extends React.Component  {
  static propTypes = {
    teamMembers: propTypes.arrayOf(propTypes.shape({
      id: propTypes.string,
      name: propTypes.string,
      position: propTypes.string,
      photo: propTypes.object,
    })),
    footerBackground: propTypes.string,
  }
  
  render() {
    const { teamMembers, footerBackground } = this.props;

    const footerBackgroundUrl = footerBackground ? footerBackground.file.url : null;

    // Format data in a simpler structure.
    const formattedTeamMembers = teamMembers.map( member => ({
      id: member.slug,
      name: member.name,
      ...(member.position && {position: member.position}),
      image: member.photo ? member.photo.file.url : 'https://via.placeholder.com/150.png?text=Image+Not+Found',
      perRow: 2,
      key: member.id,
      ...(member.body && {body: member.body}),
      ...(member.phone && {phone: member.phone}),
      ...(member.emailAddress && {emailAddress: member.emailAddress}),
    }))
    
    return (
      <section className={team.section}>
        <Container className={team.container} >
          <Row className={team.row} wrap noMargin >
            {formattedTeamMembers.map( teamMember => <TeamMember {...teamMember}/> )}
          </Row>
        </Container>
        <div className={team.footer} style={{ backgroundImage: `url(${footerBackgroundUrl})`}} />
      </section>
    )
  }
}

export const query = graphql`
  fragment TeamMembers on ContentfulModuleTeamMembers {
    slug
    footerBackground {
      file {
        url
      }
    }
    teamMembers {
      id
      name
      slug
      position
      phone
      emailAddress
      body {
        childMarkdownRemark {
          html
        } 
      }
      photo {
        file {
          url
        }
      }
    }
  }
`