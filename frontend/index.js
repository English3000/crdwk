import "babel-polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
import createStore from './store';
import App from './App';

document.addEventListener('DOMContentLoaded', () => {
  let preloadedState;
  if (window.currentUser) {
    preloadedState = {
      session: {currentUser: window.currentUser}
    };
    delete window.currentUser;
  }

  ReactDOM.hydrate(
    <App store={createStore(preloadedState)}/>,
    document.getElementById('replace-with-js')
  );
});
