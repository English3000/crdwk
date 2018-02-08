import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './pages/Home';

export default () => (
  <div>
    <Switch>
      <Route exact path='/' component={HomePage}/>
    </Switch>
  </div>
);

//If the the path is '/', show the home page.
