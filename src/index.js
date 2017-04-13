import React from 'react';
import ReactDOM from 'react-dom';
import Main from './main';
import './style.css';

ReactDOM.render(
  <Main />,
  document.querySelector('#root'),
);

/*
/ Helper Functions
*/

document.addEventListener('click', (e) => {
  // console.log(e.target);
  const notifBox = document.querySelector('.dropdown');
  const bell = document.querySelector('.bell');

  if (!(bell.contains(e.target) || notifBox.contains(e.target))) {
    notifBox.classList.remove('dropdown-transition');
    notifBox.classList.add('closed');
  }
});
