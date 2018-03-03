import * as Api from '../utils/api';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const receiveCurrentUser = user => ({type: RECEIVE_CURRENT_USER, user});

export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';
export const receiveErrors = errors => ({type: RECEIVE_ERRORS, errors});

// Actions
export const signUp = credentials => dispatch => Api.signUp(credentials).then(
  user => dispatch(receiveCurrentUser(user.data)),
  err => dispatch(receiveErrors(err.response.data))
);

export const updateUser = details => dispatch => Api.updateUser(details).then(
  user => dispatch(receiveCurrentUser(user.data))
);

export const signIn = credentials => dispatch => Api.signIn(credentials).then(
  user => dispatch(receiveCurrentUser(user.data)),
  err => dispatch(receiveErrors(err.response.data))
);

export const signOut = () => dispatch => Api.signOut().then(
  () => dispatch(receiveCurrentUser(null)),
  err => dispatch(receiveErrors(err.response.data))
);
/*
In production:
I have a server-side rendered, client-side hydrated React/Rails app.

I added the gem 'rack-cors' plus setup in application.rb in order for my requests to work.
However, for some weird reason, signing out (a DELETE request) fails and hitting refresh erases the current user.

Here's the app: http://crdwk.herokuapp.com

And the repo: https://github.com/English3000/crdwk
*/
