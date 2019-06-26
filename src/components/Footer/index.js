import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import Container from "../Container";
import Row from "../Row";
import * as footer from './footer.module.scss';
import Navigation from "../Navigation";

export default class Footer extends React.Component {
  
  static propTypes = {
    company: PropTypes.string,
    navigation: PropTypes.shape({
      slug: PropTypes.string.isRequired,
      navItems: PropTypes.arrayOf(PropTypes.shape({
        slug: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        url: PropTypes.string,
      })),
    }),
  }

  render() {
    const { navigation, company } = this.props;

    return (
      <footer className={classnames(footer.site__footer)}>
        <div className={classnames(footer.main_box)}>
          <Container className={classnames(footer.container)}>
            <Row className={classnames(footer.row)}>
              <div className={classnames(footer.box, footer.box__left)}>
                <Navigation menuItems={navigation.navItems} slug={navigation.slug} hasMobileMenu={false} />
              </div>

              <div className={classnames(footer.box, footer.box__right)}>
                <div className={classnames(footer.description_box)}>
                  <p className={classnames(footer.copywrite)}>
                    © {new Date().getFullYear()} {company} 
                    <span className={footer.design_mark}>
                      <a href="https://www.westonbaker.com" target="_blank" rel="noopener noreferrer" className={footer.design_mark_link}>Designed by Weston Baker Creative Group</a>
                    </span>
                  </p>
                </div>
              </div>
            </Row>
          </Container>
        </div>
      </footer>
    )
  }
}