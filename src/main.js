import React, { Component } from 'react';
import axios from 'axios';
import Notifications from './notifications';

class Main extends Component {

  static toggleDropDown() {
    const notifBox = document.querySelector('.dropdown');
    if (notifBox.classList.contains('closed')) {
      notifBox.classList.remove('closed');
      notifBox.classList.add('dropdown-transition');

      // marking all notifications as read in database
      axios.put('http://localhost:3001/api/notifications/');

    } else {
      notifBox.classList.remove('dropdown-transition');
      notifBox.classList.add('closed');
    }
  }

  constructor(props) {
    super(props);

    this.state = {
      notifs: [],
    };
    this.loadFromDatabase = this.loadFromDatabase.bind(this);
  }

  componentDidMount() {
    this.loadFromDatabase();
  }

  loadFromDatabase() {
    axios.get('http://localhost:3001/api/notifications/')
      .then((res) => {
        this.setState({
          notifs: res.data.reverse(),
        });
        this.loadFromSockets();
      });
  }

  loadFromSockets() {
    const socket = window.io.connect('http://localhost:3001');

    // On reciveing new-notification from server through Sockets
    // Update the View
    socket.on('new-notification', (data) => {
      this.setState({
        notifs: [{
          action: data.action,
          name: data.name,
          content: data.content,
          read: data.read,
          image: data.image,
        }, ...this.state.notifs],
      });
    });
  }

  render() {
    return (
      <div className="top-bar">
        <div className="bell" onClick={this.constructor.toggleDropDown}>
          <i className="fa fa-bell-o" />
          <div className="pri-counter">
            <b>0</b>
          </div>
        </div>
        <div className="dropdown closed">
          <div className="arrow" />
          <div className="header">
            <div className="container">
              <div className="notif-Head">Notifications</div>
              <div className="sec-counter">
                <b>0</b>
              </div>
            </div>
          </div>
          <div className="items">
            <Notifications notifs={this.state.notifs} />
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
