import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { AuthRoute } from './utils/routing';
import { ErrorBoundary, Page } from './utils/elements';
import Header from './pages/headers/Header';
import Nav from './pages/headers/Nav';
import Home from './pages/Home';
import Profile from './pages/Profile';

const mapStateToProps = ({ session }) => ({ currentUser: session.currentUser });

const pageStyle = { display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
                    fontSize: 50, backgroundColor: 'whitesmoke', height: window.innerHeight };

const Pages = ({ currentUser }) => [
  currentUser ? null :
  <ErrorBoundary key='Header'>
    <Switch>
      <Route path='/users' component={Header}/>
      <Route exact path='/' component={Header}/>
    </Switch>
  </ErrorBoundary>,

  <ErrorBoundary key='Nav'>
    <Nav currentUser={currentUser}/>
  </ErrorBoundary>,

  <ErrorBoundary key='Page'>
    <Page style={pageStyle}>
      <Switch>
        <AuthRoute exact path='/' component={Home}/>
        <Route exact path='/users/:id' component={Profile}/>
      </Switch>
    </Page>
  </ErrorBoundary>
]; //AuthRoute is redirecting to a blank page, even though URL is `/users/1`

export default connect(mapStateToProps)(Pages);
