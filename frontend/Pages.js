import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from './utils/routing';
import { ErrorBoundary, Page } from './utils/elements';
import Header from './pages/headers/Header';
import Nav from './pages/headers/Nav';
import Home from './pages/Home';
import Profile from './pages/Profile';

const mapStateToProps = ({ session }) => ({ currentUser: session.currentUser });

const pageStyle = { display: 'flex', justifyContent: 'center', alignItems: 'center',
                    fontSize: 50, backgroundColor: 'whitesmoke', height: window.innerHeight };

const Pages = ({ currentUser }) => [
  currentUser ? null :
  <ErrorBoundary key='Header'>
    <Switch>
      <Route path='/users' component={Header}/>
      <AuthRoute exact path='/' component={Header}/>
    </Switch>
  </ErrorBoundary>,

  <ErrorBoundary key='Nav'>
    <Nav currentUser={currentUser}/>
  </ErrorBoundary>,

  <ErrorBoundary key='Page'>
    <Page style={pageStyle}>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/users/:id' component={Profile}/>
      </Switch>
    </Page>
  </ErrorBoundary>
];

export default connect(mapStateToProps, null)(Pages);
