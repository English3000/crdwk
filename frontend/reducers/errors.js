import { RECEIVE_ERRORS } from '../actions/auth';

export default (state = [], action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_ERRORS:
      console.log("reducer", action.errors);
      return [].concat(action.errors);
    default:
      return [];
  }
};
