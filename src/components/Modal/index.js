import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import Container from "../Container";
import * as modal from './modal.module.scss';

export default class Modal extends React.Component {
  static propTypes = {
    isActive: PropTypes.bool,
    children: PropTypes.node,
    handleOverlay: PropTypes.func,
    close: PropTypes.func,
  }

  static defaultProps = {
    isActive: false,
    children: null,
    handleOverlay: null,
    close: null,
  }

  constructor(props) {
    super(props);

    this.onResize = this.onResize.bind(this);

    this.state = {
      isActive: props.isActive,
      isDesktop: false,
    }

    this.handleClose = this.handleClose.bind(this);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.onResize);
  }

  componentDidMount() {
    this.onResize();
    window.addEventListener("resize", this.onResize);
  }

  onResize() {
    this.setState({ isDesktop: window.innerWidth > 960 });
  }

  handleClose(event) {
    this.props.handleOverlay(event);
    this.props.close(event);
  }

  render() {
    const { isActive, children } = this.props;

    return (
      <div className={classnames(modal.modal_overlay)}>
        <div className={classnames(modal.modal__wrapper, { [modal.modal__active]: isActive })}>
          <Container className={modal.modal__container}>
            <div className={modal.modal__close_button} onClick={this.handleClose}></div>
            {children}
          </Container>
        </div>
      </div>
    )
  }
}