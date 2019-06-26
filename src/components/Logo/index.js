import React from "react";
import PropTypes from 'prop-types';
import { Link } from "gatsby";

import * as header from '../Header/header.module.scss';

const Logo = ({ title, logoUrl }) => {
  return (
    <Link to='/' className={header.logo_box} title={title}>
      <img src={logoUrl} className={header.logo_image} alt={title} />
    </Link>
  )
}

Logo.propTypes = {
  title: PropTypes.string,
  logoUrl: PropTypes.string,
}

Logo.defaultProps = {
  title: '1251 Capital',
  logoUrl: '',
}

export default Logo;