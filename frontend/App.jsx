import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePageContainer from './components/HomePageContainer';

export default () => (
  <div>
    <Switch>
      <Route exact path='/' component={HomePageContainer}/>
    </Switch>
  </div>
);
