import React, { Component } from 'react';
import Notifications from './notifications';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  toggleDropDown() {
    const notifBox = document.querySelector('.notification-dropdown');
    if (notifBox.classList.contains('closed')) {
      notifBox.classList.remove('closed');
      notifBox.classList.add('dropdown-transition');
    } else {
      notifBox.classList.remove('dropdown-transition');
      notifBox.classList.add('closed');
    }
  }

  render() {
    return (
      <div>
        <div className="notification" onClick={this.toggleDropDown}>
          <i className="fa fa-bell-o" />
          <div className="notify-count count1 common-count">
            <div className="value">0</div>
          </div>
        </div>
        <div className="notification-dropdown closed">
          <div className="arrow-up" />
          <div className="header">
            <div className="container">
              <div className="text fl">Notifications</div>
              <div className="notify-count common-count count2 fl">
                <div className="value">0</div>
              </div>
            </div>
          </div>
          <div className="items">
            <Notifications />
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
