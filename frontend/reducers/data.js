import { RECEIVE_CURRENT_USER } from '../actions/auth';
import { RECEIVE_DATA } from '../actions/visit';
import merge from 'lodash/merge';

const _nullState = {
  users: {}, ideas: {}
};

export default (state = _nullState, action) => {
  Object.freeze(state);
  let newState = merge({}, state);

  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      if (action.data) {
        newState.users = action.data.users;
        newState.ideas = action.data.ideas ? action.data.ideas : {};
        return newState;
      }
    case RECEIVE_DATA:
      if (action.data instanceof Object) {
        newState = merge({}, newState, action.data);

        if (Object.values(action.data.ideas).length - 1 === 0) {
          const idea = Object.values(action.data.ideas)[0];
          const user = newState.users[idea.user_id];
          if (user) { user.ideas.splice(user.ideas.indexOf(idea.id), 1);
                      user.ideas.unshift(idea.id); }
        }

        return newState;
      }
    default:
      return state;
  }
};
