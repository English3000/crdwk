import { RECEIVE_CURRENT_USER } from '../actions/auth';
import { RECEIVE_QUERY, RECEIVE_DATA } from '../actions/rest';

const _nullSession = {currentUser: null, loading: false};

export default (state = _nullSession, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_QUERY:
      return {currentUser: state.currentUser, loading: true};
    case RECEIVE_DATA:
      return {currentUser: state.currentUser, loading: false};
    case RECEIVE_CURRENT_USER:
      if (action.data && action.data.currentUser) {
        return {currentUser: action.data.currentUser, loading: false};
      } else if (!action.data) { return _nullSession; }
    default:
      return state;
  }
};
