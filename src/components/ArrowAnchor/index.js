import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import * as anchor from "./anchor.module.scss";

export default class ArrowAnchor extends React.Component {

  static propTypes = {
    url: PropTypes.string,
    text: PropTypes.string,
    dark: PropTypes.bool,
  }

  static defaultProps = {
    url: '/',
    text: 'Click Here',
    dark: false,
  }

  render() {
    const { url, text, className, dark } = this.props;
    const slug = url.substring(url.lastIndexOf('/') + 1);

    return (
      <div className={classnames(anchor.component, className, {[anchor.component__dark]: dark})}>
        <div className={anchor.wrapper}>
          <a className={anchor.title} href={url}>{text}</a>
          <svg className={anchor.svg} width="1em" height="1em">
            <defs>
              <marker id={`arrowhead${slug}`} viewBox="0 0 50 50" markerWidth="20" markerHeight="15" refX="8" refY="10">
                <line x1="0" y1="0" x2="11" y2="11" strokeWidth="3" />
                <line x1="0" y1="20" x2="11" y2="9" strokeWidth="3" />
              </marker>
            </defs>
            <line x1="0" y1="50%" x2="95%" y2="50%" strokeWidth="1.5" stroke="black" markerEnd={`url(#arrowhead${slug})`} />
          </svg>
        </div>
      </div>
    )
  }
}