import React from 'react';
import ReactDOM from 'react-dom';
import Main from './main';
import './style.css';

ReactDOM.render(
  <Main />,
  document.querySelector('.wrapper'),
);

document.addEventListener('click', (e) => {
  // console.log(e.target);
  const notifBox = document.querySelector('.notification-dropdown');
  const bell = document.querySelector('.notification');
  if ((!bell.contains(e.target)) && (!notifBox.contains(e.target))) {
    notifBox.classList.remove('dropdown-transition');
    notifBox.classList.add('closed');
  }
});
