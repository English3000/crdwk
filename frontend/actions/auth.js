import * as Api from '../utils/api';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const receiveCurrentUser = data => ({type: RECEIVE_CURRENT_USER, data});

export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';
export const receiveErrors = errors => ({type: RECEIVE_ERRORS, errors});

const action = (fn, ...args) => dispatch => fn(...args).then(
  res => dispatch(receiveCurrentUser(args.length > 0 ? res.data : null)),
  err => dispatch(receiveErrors(err.response.data))
);

export const signUp = credentials => action(
  (path, user) => Api.create(path, user),
  'users', credentials
);
export const signIn = credentials => action(Api.signIn, credentials);
export const signOut = () => action(Api.signOut);
