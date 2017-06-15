import React, { Component } from 'react';
import axios from 'axios';
import Notifications from './notifications';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notifs: [],
      unread: 0
    };
  }

  componentDidMount() {
    // Load notifications from DB the first time view loads
    this.loadFromDatabase();

    document.addEventListener('click', e => {
      // console.log(e.target);
      const notifBox = document.querySelector('.dropdown');
      const bell = document.querySelector('.bell');

      if (
        !(bell.contains(e.target) || notifBox.contains(e.target)) &&
        !notifBox.classList.contains('closed')
      ) {
        notifBox.classList.remove('transist');
        notifBox.classList.add('closed');

        this.setReadAll();
      }
    });
  }

  setCount() {
    const unread = this.state.notifs.filter(notif => !notif.read).length;
    this.setState({ unread }); // ES6 shorthand object asign
  }

  setReadAll() {
    // marking all notifications as read in database
    axios.put('http://localhost:3001/api/notifications/');
    this.setState({ unread: 0 });
    this.state.notifs.forEach(notif => {
      notif.read = true;
    });
  }

  loadFromDatabase() {
    axios.get('http://localhost:3001/api/notifications/').then(res => {
      this.setState({
        notifs: res.data
      });
      this.setCount();

      // now just load notifications from sockets
      this.loadFromSockets();
    });
  }

  loadFromSockets() {
    const socket = window.io.connect('http://localhost:3001');

    // On reciveing new-notification from server through Sockets & Update the View
    socket.on('new-notification', data => {
      this.setState({
        notifs: [
          ...this.state.notifs,
          {
            action: data.action,
            name: data.name,
            content: data.content,
            read: data.read,
            image: data.image
          }
        ]
      });

      this.setState({ unread: this.state.unread + 1 });
    });
  }

  deleteAll() {
    axios.delete('http://localhost:3001/api/notifications/').then(() => {
      window.location.reload();
    });
  }

  toggleDropDown() {
    const notifBox = document.querySelector('.dropdown');
    if (notifBox.classList.contains('closed')) {
      notifBox.classList.remove('closed');
      notifBox.classList.add('transist');

      axios.put('http://localhost:3001/api/notifications/');
      this.setState({ unread: 0 });
      setTimeout(() => {
        this.state.notifs.forEach(notif => {
          notif.read = true;
        });
      }, 500);
    } else {
      notifBox.classList.remove('transist');
      notifBox.classList.add('closed');
      this.setReadAll();
    }
  }

  render() {
    return (
      <div className="top-bar">
        <div className="delete" onClick={this.deleteAll}>
          Delete all Notifications from DB
        </div>
        <div className="bell" onClick={this.toggleDropDown.bind(this)}>
          <i className="fa fa-bell-o" />
          <div className="pri-counter">
            <b>{this.state.unread}</b>
          </div>
        </div>
        <div className="dropdown closed">
          <div className="arrow" />
          <div className="header">
            <div className="container">
              <div className="notif-Head">Notifications</div>
              <div className="sec-counter">
                <b>{this.state.unread}</b>
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
