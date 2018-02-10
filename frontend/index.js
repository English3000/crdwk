import "babel-polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
import createStore from './store';
import App from './App';

// When your server-rendered HTML page has finished loading,
document.addEventListener('DOMContentLoaded',
  // the browser replaces it with your JavaScript app.
  () => ReactDOM.hydrate(
    <App store={createStore()}/>,
    document.getElementById('replace-with-js')
  )
);
