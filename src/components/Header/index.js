import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import Container from "../Container";
import Row from "../Row";
import Logo from "../Logo";
import Navigation from "../Navigation";
import * as header from './header.module.scss';

export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.toggleNavigation = this.toggleNavigation.bind(this);
    this.fixSiteHeader = this.fixSiteHeader.bind(this);

    this.state = {
      isNavActive: props.isNavActive,
      isNavFixed: false,
    };
  }

  componentDidMount() {
    this.initHeader();
    window.addEventListener('scroll', this.fixSiteHeader);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.fixSiteHeader);
  }

  initHeader() {
    const siteHeader = document.querySelector(`.${header.site__header}`);
    const offset = 0;
    document.body.style.paddingTop = (offset + siteHeader.offsetHeight) + 'px';
  }

  fixSiteHeader() {
    const siteHeader = document.querySelector(`.${header.site__header}`);
    if (window.pageYOffset >= 1) {
      siteHeader.classList.add(header.state_fixed);
      this.setState({
        isNavFixed: true,
      });
    } else {
      siteHeader.classList.remove(header.state_fixed);
      document.body.style.paddingTop = 100;
      this.setState({
        isNavFixed: false,
      });
    }
  }

  toggleNavigation() {
    this.setState(prevState => ({
      isNavActive: !prevState.isNavActive
    }));
    document.body.classList.toggle('navigation--active');
  }

  static propTypes = {
    company: PropTypes.string,
    navigation: PropTypes.object,
    isNavActive: PropTypes.bool,
  }

  static defaultProps = {
    company: ``,
    navigation: null,
    isNavActive: false,
  }

  render() {
    const { company, logoUrl, navigation } = this.props;
    const { isNavActive } = this.state;

    return (
      <header className={header.site__header} role="banner">
        <nav className={classnames(header.primary_navigation, header.site__navigation, { [header.state_opened]: isNavActive })}>
          <Container className={header.container}>
            <Row className={header.row}>
              <div className={header.left_box}>
                <Logo title={company} logoUrl={logoUrl} />
              </div>

              <div className={header.right_box}>
                <Navigation menuItems={navigation.navItems} toggleNavigation={this.toggleNavigation} isActive={isNavActive} slug={navigation.slug} hasMobileMenu={true} />
              </div>
            </Row>
          </Container>
        </nav>
      </header>
    )
  }
}
