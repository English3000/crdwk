import "babel-polyfill";
import React from 'react';
import { hydrate } from 'react-dom';
import createStore from './store';
import ReactWrapper from './App';

document.addEventListener('DOMContentLoaded', () => {
  console.log('client');
  let preloadedState = { users: {} };

  if (window.currentUser) {
    preloadedState.session = {currentUser: window.currentUser};
    preloadedState.users[window.currentUser.id] = window.currentUser;
    delete window.currentUser;
  }
  if (window.user) {
    preloadedState.users[window.user.id] = window.user;
    delete window.user;
  }
  const store = createStore(preloadedState);
  window.getState = store.getState;
  hydrate( <ReactWrapper store={store}/>,
           document.getElementById('replace-with-js') );
  console.log('hydrated'); //wasn't logged, in prod
});
