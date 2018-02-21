import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { ErrorBoundary } from './utils/elements';
import AuthHeader from './pages/headers/AuthHeader';
import NewUserForm from './pages/headers/NewUserForm';
import Nav from './pages/headers/Nav';

const mapStateToProps = ({ session }) => ({ currentUser: session.currentUser });

const Pages = ({ currentUser }) => [
  currentUser ?

    currentUser.name ? null :
    <ErrorBoundary key='NewUserForm'>
      <NewUserForm currentUser={currentUser}/>
    </ErrorBoundary> :

  <ErrorBoundary key='AuthHeader'>
    <AuthHeader />
  </ErrorBoundary>,

  <ErrorBoundary key='Nav'>
    <Nav />
  </ErrorBoundary>
];

export default withRouter(connect(mapStateToProps)(Pages));
