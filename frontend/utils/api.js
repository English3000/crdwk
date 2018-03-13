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
  'http://crdwk.herokuapp.com' : 'http://localhost:3000';

export const signIn = user => axios.post(`${HOST}/api/session`, {user});
export const signOut = () => axios.delete(`${HOST}/api/session`);
export const create = (path, item) => axios.post(
  `${HOST}/api/${path}`, {[path.substring(0, path.length - 1)]: item}
);
export const visit = (path, id) => axios.get(
  `${HOST}/api/${path}/${id}`, {params: {visited: true}}
);
export const update = (path, item, ids) => axios.patch(
  `${HOST}/api/${path}/${item.id}`,
  {[path.substring(0, path.length - 1)]: item, ids}
);
export const destroy = (path, id, ids) => axios.delete(
  `${HOST}/api/${path}/${id}`, {params: {ids}}
);
export const search = query => axios.get(
  `${HOST}/api/session/search`, {params: {query}}
);
