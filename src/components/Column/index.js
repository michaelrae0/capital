import React from 'react'
import classnames from 'classnames'
import propTypes from 'prop-types'

import Row from '../Row/index'

import * as column from './column.module.scss'

// Row component with { flex-direction: column }
const Column = ({ id, children, className, ...other}) => (
  <Row className={classnames(column.direction, className)} {...other} >
    {children}
  </Row>
)

Column.propTypes = {
  id: propTypes.string,
  children: propTypes.node.isRequired,
  padded: propTypes.bool,
  noMargin: propTypes.bool,
}

export default Column;