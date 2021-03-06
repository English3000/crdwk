import * as Api from '../utils/api';
import { receiveCurrentUser, receiveErrors } from './auth';

export const RECEIVE_DATA = 'RECEIVE_DATA';
export const receiveData = data => ({type: RECEIVE_DATA, data});

export const REMOVE_DATA = 'REMOVE_DATA';
export const removeData = data => ({type: REMOVE_DATA, data});

export const RECEIVE_QUERY = 'RECEIVE_QUERY';
export const recordSearch = query => ({type: RECEIVE_QUERY, query});

function good(dispatch, res) { dispatch(receiveData(res.data)); }
function bad(dispatch, err) { dispatch(receiveErrors(err.response.data)); }

export const visit = (path, id) => dispatch => Api.visit(path, id).then(
  res => good(dispatch, res)
);
export const create = (path, item) => dispatch => Api.create(path, item).then(
  res => good(dispatch, res),
  err => { bad(dispatch, err);
           if (path === 'ideas') return err.response.data; }
);
export const update = (path, item, ids) => dispatch => Api.update(path, item, ids).then(
  res => { if (path === 'users') { dispatch(receiveCurrentUser(res.data));
         } else { good(dispatch, res); }
  }, err => bad(dispatch, err)
);
export const destroy = (path, id, ids) => dispatch => Api.destroy(path, id, ids).then(
  res => dispatch(removeData(res.data))
);
export const search = query => dispatch => {
  dispatch(recordSearch(query));
  Api.search(query).then(res => good(dispatch, res));
};
