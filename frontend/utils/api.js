import axios from 'axios';

const PORT = ':3000';

const HOST = process.env.NODE_ENV === 'production' ?
  'HEROKU URL' : 'localhost';

export const signUp = user => axios.post(`http://${HOST}${PORT}/api/users`, {user});
export const updateUser = user => axios.patch(`http://${HOST}${PORT}/api/users/${user.id}`, {user});
export const signIn = user => axios.post(`http://${HOST}${PORT}/api/session`, {user});
export const signOut = () => axios.delete(`http://${HOST}${PORT}/api/session`);

// client-side rendering
export const visitProfile = id => axios.get(`http://${HOST}${PORT}/users/${id}`);
export const findUsers = query => axios.get( `http://${HOST}${PORT}/api/users`, {params: {query}} );
