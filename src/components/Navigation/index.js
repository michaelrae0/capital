import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Link } from "gatsby";

import * as navigation from './navigation.module.scss';

export default class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.handleOnClick = this.handleOnClick.bind(this);
  }
  
  handleOnClick(event) {
    // prevent browser navigation on top level dropdown menu items
    if (event.target.href && event.target.nextSibling) {
      event.preventDefault();
    }
  }

  static propTypes = {
    menuItems: PropTypes.array,
    toggleNavigation: PropTypes.any,
    isActive: PropTypes.bool,
    slug: PropTypes.string,
    hasMobileMenu: PropTypes.bool,
  }

  static defaultProps = {
    menuItems: [],
    toggleNavigation: null,
    isActive: false,
    slug: '',
    hasMobileMenu: false,
  }

  render() {
    const { menuItems, toggleNavigation, isActive, slug, hasMobileMenu } = this.props;

    const filteredNavItems = menuItems.map(item => {
      if (item.isHomePage) {
        item.title = 'Home';
        item.slug = '/';
      }
      return item;
    });

    const externalItem = (link) => <a className={classnames(navigation.item_link, navigation.item_link__dark)} href={link.url} target="_blank" rel="noopener noreferrer">{link.title}</a>
    const internalItem = (link) => {
      // trim leading and trailing slashes
      const slug = link.slug.replace(/^\/|\/$/g, '')
      return <Link to={`/${slug}`} className={classnames(navigation.item_link, navigation.item_link__dark)} activeClassName={navigation.active}>{link.title}</Link>
    }

    const subNavItems = (items) => {
      return (
        <ul className={navigation.sub_nav_list}>
          {items.map(subNavItem => <li key={subNavItem.slug} className={classnames(navigation.sub_nav_list_item)}>{subNavItem.url ? externalItem(subNavItem) : internalItem(subNavItem)}</li>)}
        </ul>
      )
    }

    return (
      <div className={classnames(navigation.wrapper, navigation[slug], { [navigation.wrapper__state_opened]: isActive }, {[navigation.footer_navigation]: !hasMobileMenu})}>
        <ul className={classnames(navigation.item_list, {[navigation.desktop__visible]: hasMobileMenu})} onClick={this.handleOnClick}>
          {
            filteredNavItems &&
            filteredNavItems.map(link => {
              return (
                <li key={link.slug} className={classnames(navigation.item, {[navigation.has_sub_nav]: link.subNav})}>
                  {link.url ? externalItem(link) : internalItem(link)}
                  {link.subNav && subNavItems(link.subNav)}
                </li>
              )
            })
          }
        </ul>
        {hasMobileMenu &&
          <button className={classnames(navigation.menu_icon, navigation.mobile__visible, { [navigation.menu_icon__state_opened]: isActive })} onClick={toggleNavigation}>
            Primary Navigation
          </button>
        }
      </div>
    )
  }
}