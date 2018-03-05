import { RECEIVE_CURRENT_USER } from '../actions/auth';
import { RECEIVE_DATA } from '../actions/visit';
import merge from 'lodash/merge';

const _nullState = {data: {
  users: {}, ideas: {}
}};

export default (state = _nullState, action) => {
  Object.freeze(state);
  let newState = merge({}, state);

  switch (action.type) {
    case RECEIVE_DATA:
      return merge({}, newState, action.data);
    case RECEIVE_CURRENT_USER:
      if (action.user) {
        newState.users[action.user.id] = action.user;
        return newState;
      }
    default:
      return state;
  }
};
