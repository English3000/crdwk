import "babel-polyfill";
import React from 'react';
import { hydrate } from 'react-dom';
import createStore from './store';
import ReactWrapper from './App';

document.addEventListener('DOMContentLoaded', () => {
  let preloadedState = { data: {users: {}},
                         session: {} };
  if (window.presets) {
    preloadedState.session.currentUser = window.presets.currentUser;
    preloadedState.data.users = window.presets.user;
    delete window.presets;
  }
  if (window.show) {
    preloadedState.data.users[window.show.id] = window.show;
    delete window.show;
  }
  // const store = createStore(preloadedState);
  // window.getState = store.getState;
  hydrate( <ReactWrapper store={createStore(preloadedState)}/>,
           document.getElementById('replace-with-js') );
});
