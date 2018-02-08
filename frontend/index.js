import "babel-polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
import createStore from './store';
import Setup from './setup';

// When your server-rendered HTML page has finished loading,
document.addEventListener('DOMContentLoaded',
  // replace it with a browser-rendered JavaScript page.
  () => ReactDOM.hydrate(
    <Setup store={createStore()}/>,
    document.getElementById('replace-with-js')
  )
);
