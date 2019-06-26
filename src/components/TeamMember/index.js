import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

import { H3, H4 } from '../Typography'
import MemberModal from './modal'
import * as member from './member.module.scss'
import { withModal } from '../withModal';

class TeamMember extends React.Component {
  constructor(props) {
    super(props);

    this.handleOverlay = this.handleOverlay.bind(this);
    this.state = {
      isModalActive: false,
    }
  }

  static propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    position: PropTypes.string,
    image: PropTypes.string,
    perRow: PropTypes.number
  }

  static defaultProps = {
    id: null,
    name: 'Chistopher J. Maguire',
    position: 'Senior Vice President * 1251 Asset Management Platform',
    image: 'https://via.placeholder.com/150.png?text=Image+Not+Found',
    perRow: 2
  }
  
  handleOverlay(event) {
    event.preventDefault();
    this.setState({
      isModalActive: !this.state.isModalActive,
    });
  }

  render() {
    const {isModalActive} = this.state;
    const { 
      name, 
      position, 
      image, 
      perRow, 
      className,
      body,
      emailAddress,
      phone,
    } = this.props;
    
    const backgroundImage = {
      backgroundImage: `url(${image})`,
    }

    const MemberWithModal = withModal(MemberModal);

    return (
      <div className={classnames(className, member.fade_in_bottom_delay, member.item)}>
        <a href='/' className={member.url} onClick={this.handleOverlay}>
          {!!image &&
            <div className={member.image_wrapper}>
              <div className={member.image} style={backgroundImage}></div>
            </div>
          }
          <div className={classnames(member.content__image, member.content)}>
            <H3 className={member.title} text={name} />
            <H4 className={member.subtitle} text={position} />
          </div>
        </a>
        <MemberWithModal 
        { ...{ name, position, image, body, isModalActive, emailAddress, phone } }
        handleOverlay={this.handleOverlay}/>
      </div>
    )
  }
}

export default TeamMember;