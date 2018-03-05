import * as Api from '../utils/api';
import { receiveData } from './visit';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const receiveCurrentUser = data => ({type: RECEIVE_CURRENT_USER, data});

export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';
export const receiveErrors = errors => ({type: RECEIVE_ERRORS, errors});

const action = (fn, arg) => dispatch => fn(arg).then(
  res => dispatch(receiveCurrentUser(arg ? res.data : null)),
  err => { if (!arg) { console.log(err); console.log(err.response.data); }
           return dispatch(receiveErrors(err.response.data)); }
);

export const signUp = credentials => action(Api.signUp, credentials);
export const signIn = credentials => action(Api.signIn, credentials);
export const updateUser = details => action(Api.updateUser, details);
export const signOut = () => action(Api.signOut);
/* In production:
I added the gem 'rack-cors' plus setup in application.rb in order for my requests to work.
However, for some weird reason, signing out (a DELETE request) fails and hitting refresh erases the current user.
*/
