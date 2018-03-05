import axios from 'axios';
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "XCSRF-TOKEN";

const HOST = process.env.NODE_ENV === 'production' ?
  'https://crdwk.herokuapp.com' : 'http://localhost:3000';

export const signUp = user => axios.post(`${HOST}/api/users`, {user});
export const updateUser = user => axios.patch(`${HOST}/api/users/${user.id}`, {user});
export const signIn = user => axios.post(`${HOST}/api/session`, {user});
export const signOut = () => axios.delete(`${HOST}/api/session`);

// client-side rendering
export const visit = (path, id) => axios.get(`${HOST}/api/${path}/${id}`);
export const search = query => axios.get( `${HOST}/api/session/search`, {params: {query} });
