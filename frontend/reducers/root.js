import { combineReducers } from 'redux';
import session from './session';
import errors from './errors';
import data from './data';
import searches from './searches';

export default combineReducers({session, errors, data, searches});
