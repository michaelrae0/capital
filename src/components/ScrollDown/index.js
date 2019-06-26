import React from 'react'
import classnames from 'classnames'

import * as scrollDown from './scrollDown.module.scss'
import ScrollDownArrowsSVG from "../../images/svg/ScrollDownArrows.svg";


const ScrollDown = () => (
  <p className={classnames(scrollDown.component)}>
    <ScrollDownArrowsSVG className={classnames(scrollDown.arrows, scrollDown.shake_vertical)} />  scroll down
  </p>
)

export default ScrollDown;