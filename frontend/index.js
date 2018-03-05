import "babel-polyfill";
import React from 'react';
import { hydrate } from 'react-dom';
import createStore from './store';
import ReactWrapper from './App';

document.addEventListener('DOMContentLoaded', () => {
  let preloadedState = {};

  if (window.data) {
    preloadedState.data = window.data;
    delete window.data;
  }
  if (window.currentUser) {
    preloadedState.session = {currentUser: window.currentUser};
    delete window.currentUser;
  }
  // const store = createStore(preloadedState);
  // window.getState = store.getState;
  hydrate( <ReactWrapper store={createStore(preloadedState)}/>,
           document.getElementById('replace-with-js') );
});
