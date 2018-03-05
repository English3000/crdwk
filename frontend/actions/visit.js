import * as Api from '../utils/api';
import { receiveErrors } from './auth';

export const RECEIVE_DATA = 'RECEIVE_DATA';
export const receiveData = data => ({type: RECEIVE_DATA, data});

export const LOADING = 'LOADING';
export const loading = () => ({type: LOADING});

export const RECEIVE_QUERY = 'RECEIVE_QUERY';
export const recordSearch = query => ({type: RECEIVE_QUERY, query});

// Actions
export const visitProfile = id => dispatch => Api.visitProfile(id).then(
  info => dispatch(receiveData(info.data))
);

export const search = query => dispatch => {
  dispatch(loading());
  dispatch(recordSearch(query));
  Api.search(query).then( results => dispatch(receiveData(results.data)) );
};
