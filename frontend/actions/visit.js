import * as Api from '../utils/api';
import { receiveErrors } from './auth';

export const RECEIVE_DATA = 'RECEIVE_DATA';
export const receiveData = data => ({type: RECEIVE_DATA, data});

export const RECEIVE_QUERY = 'RECEIVE_QUERY';
export const recordSearch = query => ({type: RECEIVE_QUERY, query});

function good(dispatch, res) { dispatch(receiveData(res.data)); }

export const visit = (path, id) => dispatch => Api.visit(path, id).then(
  res => good(dispatch, res)
);

export const search = query => dispatch => {
  dispatch(recordSearch(query));
  Api.search(query).then(res => good(dispatch, res));
};
