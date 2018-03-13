import { RECEIVE_CURRENT_USER } from '../actions/auth';
import { RECEIVE_DATA, REMOVE_DATA } from '../actions/rest';
import merge from 'lodash/merge';

const _nullState = {
  users: {}, ideas: {}
};

export default (state = _nullState, action) => {
  Object.freeze(state);
  let newState = merge({}, state);
  let ideas = {};
  if (action.data instanceof Object && action.data.ideas) {
    ideas = Object.values(action.data.ideas);
  }

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

        if (ideas.length - 1 === 0) {
          const idea = ideas[0];
          const user = newState.users[idea.user_id];
          if (user && state.ideas[idea.id].updated_at !== idea.updated_at) {
            user.ideas.splice(user.ideas.indexOf(idea.id), 1);
            user.ideas.unshift(idea.id); 
          }
        }

        return newState;
      }
    case REMOVE_DATA:
      if (ideas.length > 0) {
        ideas.forEach(idea => {
          delete newState.ideas[idea.id];
          const user = newState.users[idea.user_id];
          user.ideas.splice(user.ideas.indexOf(idea.id), 1);
        });

        return newState;
      }
    default:
      return state;
  }
};
