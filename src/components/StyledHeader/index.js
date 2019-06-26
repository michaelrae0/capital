import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import header from "./header.module.scss";

export default class StyledHeader extends React.Component {

  render() {
    const { title, className } = this.props;
    return (
      <h3 className={classnames(header.styled, className)}>{title}</h3>
    )
  }
}