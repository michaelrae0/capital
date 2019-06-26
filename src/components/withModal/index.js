import React from "react";
import PropTypes from "prop-types";

import * as modal from './modal.module.scss';
import Portal from "../Portal";

export function withModal(WrappedComponent) {
  return class extends React.Component {

    static propTypes = {
      isModalActive: PropTypes.bool,
    }

    static defaultProps = {
      isModalActive: false,
    }

    constructor(props) {
      super(props);

      this.handleOverlay = this.handleOverlay.bind(this);
      this.handleBackdropClick = this.handleBackdropClick.bind(this);
      this.close = this.close.bind(this);
      this.init = this.init.bind(this);

      this._element = null;
      this._triggeringElement = null;
      this._dialog = React.createRef();

      this.state = {
        isModalActive: props.isModalActive,
      }

      if (props.isModalActive) {
        this.init();
      }
    }

    init() {
      try {
        this._triggeringElement = document.activeElement;
      } catch (err) {
        this._triggeringElement = null;
      }

      if (!this._element) {
        this._element = document.createElement('div');
        this._element.setAttribute('tabindex', '-1');
        this._element.classList.add('modal--active');
        this._element.style.zIndex = this.props.zIndex;
        document.body.appendChild(this._element);
      }
    }

    close() {
      if (this.state.isModalActive) {
        if (this._element) {
          document.body.removeChild(this._element);
          this._element = null;
        }
      }
    }

    handleBackdropClick(event) {
      this.handleOverlay(event);
      this.close(event);
    }

    componentDidMount() {
      if (this.state.isModalActive) {
        document.body.classList.toggle('state-modal-active');
      }
      this._isMounted = true;
    }

    componentDidUpdate(prevProps, prevState) {
      if (this.state.isModalActive && !prevState.isModalActive) {
      }
    }

    handleOverlay(event) {
      document.body.classList.toggle('state-modal-active');
      this.props.handleOverlay(event);
    }

    setFocus() {
      if (this._dialog && this._dialog.parentNode && typeof this._dialog.parentNode.focus === 'function') {
        this._dialog.parentNode.classList.add(modal.dialog);
        this._dialog.parentNode.focus();
      }
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.isModalActive && !this.props.isModalActive) {
        this.setState({ isModalActive: nextProps.isModalActive });
      }
    }

    componentWillUpdate(nextProps, nextState) {
      if (nextState.isModalActive && !this.state.isModalActive) {
        this.init();
      }
    }

    manageFocusAfterClosing() {
      if (this._triggeringElement) {
        this._triggeringElement.focus();
        this._triggeringElement = null;
      }
    }

    render() {
      const { isModalActive } = this.state;
      return (
        <React.Fragment>
          {isModalActive && <Portal node={this._element} >
            <div className={modal.backdrop} onClick={this.handleBackdropClick}></div>
              <WrappedComponent
                ref={(current) => { this._dialog = current; }}
                {...this.props}
                isActive={isModalActive}
                handleOverlay={this.handleOverlay}
                close={this.close}
              />
          </Portal>}
        </React.Fragment>
      )
    }
  }
}