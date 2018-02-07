import "babel-polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store';
import Setup from './setup';

document.addEventListener('DOMContentLoaded',
  () => ReactDOM.hydrate(
    <Setup store={configureStore()}/>,
    document.getElementById('replace-with-js')
  )
);
