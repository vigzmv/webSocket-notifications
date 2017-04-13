import React, { Component } from 'react';

class Notifications extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="list-item noti">
        <div className="image fl">
          <img src="image" alt="profile-pic" />
        </div>
        <div className="text fl">
          <b className="name fl">name </b>
          text
        </div>
      </div>
    );
  }
}

export default Notifications;
