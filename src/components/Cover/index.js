import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import replace from 'react-string-replace';
import ScrollTrigger from 'react-scroll-trigger';

import Container from '../Container'
import Row from '../Row'
import Column from '../Column'
import ScrollDown from '../ScrollDown'
import { H1, SectionBody } from '../Typography'
import {extractEmail} from '../../utils/string';

import * as cover from "./cover.module.scss"

export default class Cover extends React.Component {
  constructor(props) {
    super(props);

    this.onEnterViewport = this.onEnterViewport.bind(this);

    this.state = {
      visible: false,
    };
  }

  static propTypes = {
    title: PropTypes.string,
    slug: PropTypes.string,
    body: PropTypes.node,
    backgroundImage: PropTypes.string,
    style: PropTypes.bool,
    hasOverlay: PropTypes.bool,
    displayScrollDown: PropTypes.bool,
    reducedHeight: PropTypes.bool,
    centerContent: PropTypes.bool,
  }
  
  static defaultProps = {
    title: '1251 Asset Management',
    slug: '1251-asset-management',
    backgroundImage: '',
    body: null,
    style: false,
    hasOverlay: false,
    displayScrollDown: false,
    reducedHeight: false,
    alignedVertical: false,
  }

  onEnterViewport() {
    this.setState({
      visible: true,
    });
  }
  
  render() {
    const { visible } = this.state;
    const {
      backgroundImage,
      title,
      body,
      rightContent,
      children,
      style,
      hasOverlay,
      displayScrollDown,
      reducedHeight,
      alignedVertical,
    } = this.props;

    const backgroundImageUrl = `url(${backgroundImage})`;

    const formattedTitle = (title) => {
      const email = extractEmail(title);
      return replace(title, email, (match, i) => (
        <a href={`mailto:${match}`} className={cover.title_email} key={i}>{match}</a>
      ))
    }
    
    return (
      <section
        className={classnames(
          cover.section,
          {[cover.section__style]: style},
          {[cover.section__blue_filter]: hasOverlay},
          {[cover.section__noBody]: body === null},
          {[cover.section__reduced_height]: reducedHeight},
          {[cover.section__aligned_vertical]: alignedVertical},
        )}
        style={{backgroundImage: backgroundImageUrl}}
      >
        <Container className={classnames(cover.container)}>
          <Row className={classnames(cover.row, {[cover.row__reduced_margin]: body !== null})} >
            <Column noMargin >
              <ScrollTrigger onEnter={this.onEnterViewport}/>
              <H1 className={classnames(cover.title, cover.scroll_reveal, {[cover.fade_in_bottom]: visible}, {[cover.no_margin]: !body})} text={formattedTitle(title)} />
              {body && <SectionBody className={classnames(cover.body, cover.scroll_reveal, {[cover.fade_in_bottom]: visible})} text={body} />}
            </Column>
            {rightContent}
          </Row>
          {children && <Row>{children}</Row>}
        </Container>
        {displayScrollDown && <ScrollDown />}
      </section>
    )
  }
}