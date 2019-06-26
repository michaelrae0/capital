import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import * as affiliate from './affiliate.module.scss';
import Row from "../Row";
import { H2 } from "../Typography"
import Modal from "../Modal"

export default class AffiliateModal extends React.Component {

  static propTypes = {
    isModalActive: PropTypes.bool,
    title: PropTypes.string,
    image: PropTypes.string,
    handleOverlay: PropTypes.func,
  }

  static defaultProps = {
    isModalActive: false,
    title: 'Modal Title',
    image: 'https://source.unsplash.com/random',
    handleOverlay: PropTypes.func,
  }

  render() {
    const {
      title,
      image,
      isActive,
      handleOverlay,
      close,
      body,
      location,
      leadership,
      investmentYear,
      url,
    } = this.props;

    const affiliateDetails = [
      ...(location && {label: 'Location', value: location}),
      ...(leadership && {label: 'Leadership', value: leadership}),
      ...(investmentYear && {label: 'Investment Year', value: investmentYear}),
      ...(url && {label: '', value: url}),
    ];

    const renderAffiliateDetails = (details) => (
      <ul className={affiliate.modal_details}>
        {details.map((detail, i) => {
          // if the value is a url, wrap in anchor tag
          const value = /(http(s?)):\/\//gi.test(detail.value) ? 
          <a className={affiliate.link_undecorated} href={detail.value} target="_blank" rel="noopener noreferrer">{detail.value.replace('https://', '')}</a> :
          detail.value;
          const isLink = /(http(s?)):\/\//gi.test(detail.value) && true
          
          return (
            <li key={i} className={classnames(affiliate.modal__details__item, {[affiliate.modal__details__item__link]: isLink})}>
              {detail.label}
              <strong className={classnames(affiliate.modal__details__item_value, {[affiliate.modal__details__item_value__link]: isLink})}>{value}</strong>
            </li>
          )
        })}
      </ul>
    );

    const content = body.childMarkdownRemark ? body.childMarkdownRemark.html : '';

    return (
      <Modal handleOverlay={handleOverlay} close={close} isActive={isActive}>
        <Row className={affiliate.modal__row}>
          <div className={affiliate.modal__image_wrapper}>
            <img src={image} className={affiliate.modal__image} alt={title} />
          </div>
        </Row>
        <Row className={affiliate.modal__row}>
          <div className={affiliate.modal__body}>
            <div className={affiliate.modal__details}>
              {affiliateDetails && renderAffiliateDetails(affiliateDetails)}
            </div>
            <div className={affiliate.modal__content}>
              <H2 text={title} className={affiliate.modal__title} />
              <div className={affiliate.remark_content} dangerouslySetInnerHTML={{ __html: content }}></div>
            </div>
          </div>
        </Row>
      </Modal>
    )
  }
}