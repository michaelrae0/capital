import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import * as member from './member.module.scss';
import Row from "../Row";
import Modal from "../Modal"
import { H1, H6 } from "../Typography"

export default class MemberModal extends React.Component {

  static propTypes = {
    isModalActive: PropTypes.bool,
    name: PropTypes.string,
    image: PropTypes.string,
    handleOverlay: PropTypes.func,
  }

  static defaultProps = {
    isModalActive: false,
    name: 'Modal Title',
    image: 'https://source.unsplash.com/random',
    handleOverlay: PropTypes.func,
  }

  render() {
    const { name, image, isActive, handleOverlay, close, body, position, phone, emailAddress } = this.props;
    const content = body.childMarkdownRemark ? body.childMarkdownRemark.html : '';

    return (
      <Modal handleOverlay={handleOverlay} close={close} isActive={isActive}>
          <Row noMargin wrap className={member.modal__top_row}>
            <img src={image} className={member.modal__image} alt={name}/>
            <div className={member.modal__details_wrapper}>
              <H1 text={name} />
              <H6 text={position} className={classnames(member.text_gray, member.modal__position)} />
              <ul className={member.modal__details}>
                {phone && <li className={member.modal__details__item}>{phone}</li>}
                {emailAddress && <li className={member.modal__details__item}>{emailAddress}</li>}
              </ul>
            </div>
          </Row>
          <Row noMargin>
            <div className={classnames(member.remark_content, member.modal__content)} dangerouslySetInnerHTML={{ __html: content }}></div>
          </Row>
        </Modal>
    )
  }
}