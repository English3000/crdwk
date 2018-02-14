import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ErrorBoundary, Page } from './utils/elements';
import { AuthRoute, ProtectedRoute } from './utils/routing';
import Header from './pages/headers/Header';
import Home from './pages/Home';
import Profile from './pages/Profile';

const pageStyle = { display: 'flex', justifyContent: 'center', alignItems: 'center',
                    backgroundColor: 'whitesmoke', height: window.innerHeight };

export default () => [
  <ErrorBoundary>
    <Switch key='Header'>
      <Route path='/users' component={Header}/>
      <Route exact path='/' component={Header}/>
    </Switch>
  </ErrorBoundary>,

  <ErrorBoundary>
    <Page key='Page' style={pageStyle}>
      <Switch>
        <AuthRoute exact path='/' component={Home}/>
        <Route exact path='/users/:id' component={Profile}/>
      </Switch>
    </Page>
  </ErrorBoundary>
];
