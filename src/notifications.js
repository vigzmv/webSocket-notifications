import React, { Component } from 'react';

class Notifications extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notifs: this.props.notifs
    };
  }

  render() {
    const list = this.props.notifs.map((notif, index) => (
        <div className="list-item noti" key={index}>
          <div className="image">
            <img src={notif.image} alt="profile-pic" />
          </div>
          <div className="content">
            <b>{notif.name}</b>
            {notif.content}
          </div>
        </div>
      )
    );

    return (
      <div>
        {list}
      </div>
    );
  }
}

export default Notifications;
