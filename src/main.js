import React, { Component } from 'react';
import Notifications from './notifications';
import axios from 'axios';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notifs: [],
    };
    this.loadFromDatabase = this.loadFromDatabase.bind(this);
  }

  componentDidMount() {
    setInterval(() => {
      this.loadFromDatabase();
    }
    , 3000)
  }

  loadFromDatabase() {
    axios.get('http://localhost:3001/api/notifications/')
      .then((res) => {
        this.setState({
          notifs: res.data.reverse(),
        });
      });
  }

  toggleDropDown() {
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

  render() {
    return (
      <div className="top-bar">
        <div className="bell" onClick={this.toggleDropDown}>
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
