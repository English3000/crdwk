import "babel-polyfill";
import React from 'react';
import { hydrate } from 'react-dom';
import createStore from './store';
import ReactWrapper from './App';

document.addEventListener('DOMContentLoaded', () => {
  let preloadedState = { data: {users: {}, ideas: {}},
                         session: {} };
  if (window.presets) {
    preloadedState.session.currentUser = window.presets.currentUser;
    preloadedState.data.users[window.presets.user.id] = window.presets.user;
    delete window.presets;
  }
  if (window.user) {
    preloadedState.data.users[window.user.id] = window.user;
    delete window.user;
  }
  if (window.idea) {
    preloadedState.data.ideas[window.idea.id] = window.idea;
    delete window.idea;
  }
  // const store = createStore(preloadedState);
  // window.getState = store.getState;
  hydrate( <ReactWrapper store={createStore(preloadedState)}/>,
           document.getElementById('replace-with-js') );
});
