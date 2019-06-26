import React from 'react';
import classnames from 'classnames';

import ArrowSVG from "../../images/svg/Arrow.svg";
import * as style from "./arrow.module.scss";

export default class Arrow extends React.Component {

  render() {
    const { className } = this.props;

    return (
      <span className={classnames(style.arrow, className)}>
        <ArrowSVG />
      </span>
    )
  }
}