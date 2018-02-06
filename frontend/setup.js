import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import HomePageContainer from './components/HomePageContainer';

export default ({ store }) => (
  <Provider store={store}>
    <HashRouter>
      <HomePageContainer />
    </HashRouter>
  </Provider>
);
