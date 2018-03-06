import axios from 'axios';

// WHY, http://guides.rubyonrails.org/security.html#csrf-countermeasures
// HOW, https://learnetto.com/blog/how-to-make-ajax-calls-in-rails-5-1-with-or-without-jquery
const csrfToken = document.querySelector("meta[name=csrf-token]").content;
axios.defaults.headers.common["X-CSRF-Token"] = csrfToken;
/* When using another library to make Ajax calls, it is necessary to add
the security token as a default header for Ajax calls in your library.
To get the token, have a look at <meta name='csrf-token' content='THE-TOKEN'>
tag printed by <%= csrf_meta_tags %> in your application view. */

const HOST = process.env.NODE_ENV === 'production' ?
  'https://crdwk.herokuapp.com' : 'http://localhost:3000';

export const signUp = user => axios.post(`${HOST}/api/users`, {user});
export const updateUser = user => axios.patch(`${HOST}/api/users/${user.id}`, {user});
export const signIn = user => axios.post(`${HOST}/api/session`, {user});
export const signOut = () => axios.delete(`${HOST}/api/session`);

export const visit = (path, id) => axios.get(`${HOST}/api/${path}/${id}`);
export const search = query => axios.get( `${HOST}/api/session/search`, {params: {query} });
