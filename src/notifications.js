import React, { Component } from 'react';
import FlipMove from 'react-flip-move';

class Notifications extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notifs: this.props.notifs,
    };
  }

  render() {
    const list = this.props.notifs.map((notif, index) => (
      <div className={notif.read ? 'li' : 'li new'} key={index}>
        <div className="pic">
          <img src={notif.image} alt="profile-pic" />
        </div>
        <div className="content">
          <b>{notif.name} </b> {notif.action} your {notif.content}
        </div>
      </div>
    ));

    return (
      <div>
        <FlipMove
          duration={200}
          leaveAnimation="fade"
          enterAnimation="fade"
        >
          {list.reverse()}
        </FlipMove>
      </div>
    );
  }
}

export default Notifications;
