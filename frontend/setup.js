import React from 'react';
import { Provider } from 'react-redux';
//Provider gives nested components access to the store.
import { HashRouter } from 'react-router-dom';
//HashRouter allows components to modify the URL.
import App from './App';

export default ({ store }) => (
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>
);
