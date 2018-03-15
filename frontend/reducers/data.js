import { RECEIVE_CURRENT_USER } from '../actions/auth';
import { RECEIVE_DATA, REMOVE_DATA } from '../actions/rest';
import merge from 'lodash/merge';

const _nullState = {
  users: {}, ideas: {}, comments: {}
};

export default (state = _nullState, action) => {
  Object.freeze(state);
  let newState = merge({}, state);
  let ideas = {};
  if (action.data instanceof Object && action.data.ideas) {
    ideas = Object.values(action.data.ideas);
  }
  let comments = {};
  if (action.data instanceof Object && action.data.comments) {
    comments = Object.values(action.data.comments);
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
          const parent = newState.users[idea.user_id] || newState.ideas[idea.idea_id];
          if (parent && (!state.ideas[idea.id] ||
                state.ideas[idea.id].updated_at !== idea.updated_at)) {
            parent.ideas.splice(parent.ideas.indexOf(idea.id), 1);
            parent.ideas.unshift(idea.id);
          }
        }

        if (comments.length - 1 === 0) {
          const comment = comments[0];
          const parent = newState.ideas[comment.idea_id] || newState.comments[comment.comment_id];
          if (parent && (!state.comments[comment.id] ||
                state.comments[comment.id].updated_at !== comment.updated_at)) {
            parent.comments.splice(parent.comments.indexOf(comment.id), 1);
            parent.comments.unshift(comment.id);
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
