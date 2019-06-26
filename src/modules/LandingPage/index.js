import React from 'react'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import ScrollTrigger from 'react-scroll-trigger'

import * as home from './landingPage.module.scss'
import Container from '../../components/Container'
import Column from '../../components/Column'
import { H1, H3,H6 } from '../../components/Typography'
import LandingCarotSVG from '../../images/svg/LandingCarot.svg'

export default class LandingPage extends React.Component {
  constructor(props) {
    super(props);

    this.onEnterViewport = this.onEnterViewport.bind(this);

    this.state = {
      visible: false,
    };
  }

  static propTypes = {
    company: PropTypes.string,
    title: PropTypes.string,
    backgroundImage: PropTypes.object,
  }
  
  static defaultProps = {
    company: '1251 Capital Group',
    title: 'A leading financial services holding company with deep industry operating experience.',
    links: [
      { text: '1251 Asset Management', url: '/' },
      { text: '1251 Insurance', url: '/'},
    ],
    backgroundImage: null,
  }

  onEnterViewport() {
    this.setState({
      visible: true,
    });
  }
  
  render() {
    const { visible } = this.state;
    const {title, subTitle, pageLinks, backgroundImage } = this.props;
    const backgroundImageAttr = `url(${backgroundImage.file.url})`;

    return (
      <section className={classnames(home.section, 'background_image')} style={{backgroundImage: backgroundImageAttr}} >
        <Container className={home.holdings_container} >
          <ScrollTrigger onEnter={this.onEnterViewport}/>
          <Column className={home.column}>
            <H6 className={classnames(home.company, home.scroll_reveal, {[home.fade_in_bottom]: visible})} text={subTitle} />
            <H1 className={classnames(home.title, home.scroll_reveal, {[home.fade_in_bottom]: visible})} text={title} />

            {pageLinks.map( link => (
              <a className={home.link} href={link.url} target="_blank" rel="noopener noreferrer" key={link.url} >
                <LandingCarotSVG className={classnames(home.carot, home.scroll_reveal, {[home.fade_in_right]: visible})} /><H3 text={link.title} />
              </a> 
            ))}
            
          </Column>
        </Container>
        <div className={home.sideContent} ><H6 text={subTitle} className={home.sideContent__text} /></div>
      </section>
    )
  }
}

export const query = graphql`
  fragment LandingPage on ContentfulModuleLandingPage {
    slug
    title
    subTitle
    backgroundImage {
      file {
        url
      }
    }
    pageLinks {
      __typename 
      ... on ContentfulComponentNavigationItem {
        title
        slug
        url
      }
    }
  }
`