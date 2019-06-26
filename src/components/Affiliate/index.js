import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import * as affiliate from './affiliate.module.scss'
import AffiliateModal from './modal'
import { withModal } from '../withModal'

export default class Affiliate extends React.Component {
  constructor(props) {
    super(props);

    this.handleOverlay = this.handleOverlay.bind(this);
    this.state = {
      isModalActive: false,
    }
  }

  static propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    image: PropTypes.string,
    perRow: PropTypes.number,
  }

  handleOverlay(event) {
    event.preventDefault();
    this.setState({
      isModalActive: !this.state.isModalActive,
    });
  }
  
  render() {
    const { isModalActive } = this.state;
    const { 
      image,
      title,
      location,
      leadership,
      investmentYear,
      url,
      body
    } = this.props;
    const backgroundImage = {
      backgroundImage: `url(${image})`,
    }

    const AffiliateWithModal = withModal(AffiliateModal);

    return (
      <div className={classnames(affiliate.item, affiliate.fade_in_bottom_delay)}>
        <a href='/' className={affiliate.url} onClick={this.handleOverlay}>
          {!!image &&
            <div className={affiliate.item_wrapper}>
              <div className={affiliate.image} style={backgroundImage}></div>
            </div>
          }
        </a>
        <AffiliateWithModal 
          { ...{ title, location, leadership, investmentYear, body, url, image, isModalActive } }  
          handleOverlay={this.handleOverlay}
          />
      </div>
    )
  }
}