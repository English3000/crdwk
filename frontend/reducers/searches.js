import { RECEIVE_QUERY } from '../actions/rest';
import merge from 'lodash/merge';

export default (state = {}, action) => {
  let newState = merge({}, state);

  switch (action.type) {
    case RECEIVE_QUERY:
      const len = action.query.length;
      if (!newState[len]) newState[len] = [];
      newState[len].push(action.query.toLowerCase());
      return newState;
    default:
      return state;
  }
};
