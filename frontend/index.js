import "babel-polyfill";
import React from 'react';
import { hydrate } from 'react-dom';
import merge from 'lodash/merge';
import createStore from './store';
import ReactWrapper from './App';

document.addEventListener('DOMContentLoaded', () => {
  let preloadedState = { data: {users: {}, ideas: {}},
                         session: {} };
  if (window.presets) {
    preloadedState.session.currentUser = window.presets.currentUser;
    preloadedState.data.users = window.presets.users;
    preloadedState.data.ideas = window.presets.ideas ? window.presets.ideas : {};
    delete window.presets;
  }
  if (window.showUser) {
    preloadedState.data = merge({}, preloadedState.data, window.showUser);
    delete window.showUser;
  } else if (window.showIdea) {
    preloadedState.data = merge({}, preloadedState.data, window.showIdea);
    delete window.showIdea;
  }
  const store = createStore(preloadedState);
  window.getState = store.getState;
  hydrate( <ReactWrapper store={store/*createStore(preloadedState)*/}/>,
           document.getElementById('replace-with-js') );
});
