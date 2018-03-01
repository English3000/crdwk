import axios from 'axios';

const HOST = process.env.NODE_ENV === 'production' ?
  'https://crdwk.herokuapp.com' : 'http://localhost:3000';

export const signUp = user => axios.post(`${HOST}/api/users`, {user}, {crossDomain: true});
export const updateUser = user => axios.patch(`${HOST}/api/users/${user.id}`, {user}, {crossDomain: true});
export const signIn = user => axios.post(`${HOST}/api/session`, {user}, {crossDomain: true});
export const signOut = () => axios.delete(`${HOST}/api/session`, {crossDomain: true});

// client-side rendering
export const visitProfile = id => axios.get(`${HOST}/users/${id}`, {crossDomain: true});
export const findUsers = query => axios.get( `${HOST}/api/users`, {params: {query}}, {crossDomain: true});
