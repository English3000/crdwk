import axios from 'axios';

const HOST = process.env.NODE_ENV === 'production' ?
  'https://crdwk.herokuapp.com' : 'http://localhost:3000';

export const signUp = user => axios.post(`${HOST}/api/users`, {user});
export const updateUser = user => axios.patch(`${HOST}/api/users/${user.id}`, {user});
export const signIn = user => axios.post(`${HOST}/api/session`, {user});
export const signOut = () => axios.delete(`${HOST}/api/session`);

// client-side rendering
export const visitProfile = id => axios.get(`${HOST}/users/${id}`);
export const findUsers = query => axios.get( `${HOST}/api/users`, {params: {query}} );
