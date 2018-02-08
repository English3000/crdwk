import axios from 'axios';

const PORT = ':3000';

export const HOST = process.env.NODE_ENV === 'development' ?
  `192.168.3.166${PORT}` : 'HEROKU URL';

// =>                               method               path        payload
export const signUp = user => axios.post(`http://${HOST}/api/users`, {user});
export const signIn = user => axios.post(`http://${HOST}/api/session`, {user});
export const signOut = () => axios.delete(`http://${HOST}/api/session`);
