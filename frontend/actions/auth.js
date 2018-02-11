import * as Api from '../utils/api';

// ACTION TYPES
export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';

// ACTION FUNCTIONS-to-OBJECTS
export const receiveCurrentUser = currentUser => ({
  type: RECEIVE_CURRENT_USER,
  currentUser
});
export const receiveErrors = errors => ({
  type: RECEIVE_ERRORS,
  errors
});

// API CALLS

// First our API sends a request to the backend.
export const signUp = credentials => dispatch => Api.signUp(credentials).then(
  // Then, if the request succeeds, its response data is dispatched to
  //   the store (a JavaScript object of data that the frontend can access).
  user => dispatch(receiveCurrentUser(user.data)),
  // If the request fails, its error data is dispatched to the store instead.
  err => { console.log("action", err.response.data);
    dispatch(receiveErrors(err.response.data));
           return err.response.data; }
);

export const signIn = credentials => dispatch => Api.signIn(credentials).then(
  user => dispatch(receiveCurrentUser(user.data)),
  err => { dispatch(receiveErrors(err.response.data));
           return err.response.data; }
);

export const signOut = () => dispatch => Api.signOut().then(
  _ => dispatch(receiveCurrentUser(null))
);
