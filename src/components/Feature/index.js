import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import ScrollTrigger from 'react-scroll-trigger'

import { H3 } from '../Typography/index'

import * as feature from './feature.module.scss'

export default class Feature extends React.Component {
  constructor(props) {
    super(props);

    this.onEnterViewport = this.onEnterViewport.bind(this);

    this.state = {
      visible: false,
    };
  }

  onEnterViewport() {
    this.setState({
      visible: true,
    });
  }

  static propTypes = {
    headline: PropTypes.string,
    body: PropTypes.string,
    icon: PropTypes.string,
    gridEnabled: PropTypes.bool
  }

  static defaultProps = {
    headline: 'Distribution Support',
    body: 'With over 30+ years of exevutive sales and marketing experience at major asset managers, 1251 will offer to its Affiliates the expertise and central resources to expand distribution and grow sales & marketing capabilities.',
    icon: 'https://image.flaticon.com/icons/png/512/108/108475.png',
    gridEnabled: false,
  }

  render() {
    const { visible } = this.state;
    const { headline, body, icon, gridEnabled } = this.props;
    const componentClassName = gridEnabled ? 'component_grid' : 'component_list';
    const headlineClassName = gridEnabled ? 'headline_grid' : 'headline_list';
    
    return (
      <ScrollTrigger className={classnames(feature[componentClassName], feature.scroll_reveal, {[feature.fade_in_bottom_delay]: visible})} onEnter={this.onEnterViewport}>
        <img src={icon} className={classnames(feature.icon)} alt='' />
        <H3 text={headline} className={classnames(feature[headlineClassName])} />
        {gridEnabled && <div dangerouslySetInnerHTML={{ __html: body }} className={classnames(feature.body, 'h4')} />}
      </ScrollTrigger>
    )
  }
}