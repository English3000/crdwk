import React from 'react';
import { Provider } from 'react-redux';
//Provider gives nested components access to the store.
import { HashRouter } from 'react-router-dom';
//HashRouter allows components to modify the URL.
import Pages from './Pages';

export default ({ store }) => (
  <Provider store={store}>
    <HashRouter>
      <Pages />
    </HashRouter>
  </Provider>
);
