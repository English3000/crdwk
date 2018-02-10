import "babel-polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
import createStore from './store';
import App from './App';

// When your server-rendered HTML page has finished loading,
document.addEventListener('DOMContentLoaded', () => {
  let preloadedState;
  if (window.currentUser) {
    preloadedState = {
      session: {currentUser: window.currentUser}
    };
    delete window.currentUser;
  }
  // the browser replaces it with your JavaScript app.
  ReactDOM.hydrate(
    <App store={createStore(preloadedState)}/>,
    document.getElementById('replace-with-js')
  );
});
