import "babel-polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store';
import Setup from './setup';

document.addEventListener('DOMContentLoaded', () => {
  let preloadedState;
  // if (window.currentUser) {
  //   preloadedState = {
  //     session: {currentUser: window.currentUser}
  //   };
  //   delete window.currentUser;
  // }
  const store = configureStore(preloadedState);

  window.getState = store.getState;

  ReactDOM.render(<Setup store={store}/>, document.getElementById('current-page'));
});
