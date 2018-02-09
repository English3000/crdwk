Next, let's allow users to sign into our website.

## User Authentication Backend (Ruby on Rails)

`rails g controller Api::Users` (allows us to do stuff with users)

`rails g model User email:string password_digest:string session_token:string` (defines the properties/data for a user)

`⌘ t` in Atom. Type _users_ & select **db/migrate/** + time of migration + **create_users.rb**. Copy & paste.

`⌘ t` _user.rb_, copy & paste.

`⌘ t` _Gemfile_, uncomment `gem 'bcrypt'` (because we use BCrypt in **user.rb**)

`bundle update`

`⌘ t` _application_controller.rb_, copy & paste.

`rails g controller Api::Sessions`

`⌘ t` _users_controller.rb_, copy & paste.

`⌘ t` _sessions_controller.rb_, copy & paste.

`⌘ t` _routes.rb_, copy & paste.

>`rails db:create` (instantiates databases for this project locally on our computer)

`rails db:migrate` (creates a Users table in our databases)

## User Authentication Frontend (React/Redux)

# [Skip to coding instructions](https://github.com/English3000/Intro-to-Coding/tree/user-auth#actions--api)

### EXPLANATION

The reason to even have a backend is to make your website dynamic.

If you just hosted a frontend (HTML + CSS + JavaScript), your website would be "static"--a user couldn't do anything to change what they see on your site. The only way for your site to change would be if you changed the code.

With a backend, you can customize what each user sees. This is achieved by recording users in a database table (as we just setup on the backend) and associating other data with a particular user's unique id.

So here's what we just did:

As a reminder, the backend connects the frontend and your database. So when a request is made to sign up (as a brand new user), sign in, or sign out, **routes.rb** will point (route) that request to either the UsersController or SessionsController.

A request consists of a path (e.g. `/api/users`), an action/method (e.g. `POST`), and _sometimes_ a payload (e.g. a user's email & password).

`/api/users` will be matched to the UsersController. Because the request's method is `POST`, the **controller** will then `create` a new user, saving it to the database and sending back some of the user's info--filtered down with a view _(or as a JavaScript object, which is a data structure that looks like_ `{key: 'value'}`_)_--to the frontend.

**Migrations** create or modify tables in the database. They can include constraints, such as that all users' emails must be unique.

**Models** also can have constraints, for example that a password must be at least 8 characters long.

If these constraints aren't met, the action to the database will fail. That's why you see some `if/else` logic for handling potential errors.

Models can also have _associations_--methods that access data associated with a user, for example, from the database.

Controllers can also have non-routing/non-database methods, such as checking whether there is currently a user signed in.

~ ~ ~

On the frontend, we need a way to send requests to the backend and we also need a way to handle the backend's responses (which consist of an HTML page or JSON data). That's where React and Redux come in.

React allows you to code out your webpages entirely in JavaScript (with a special kind of XML). This means you can have your layout, styling, and interactive scripting (aka event handlers) all in the same file (in what's called a **component**).

Let's say you have a component with a form, and when you click the button, the event handler sends a request to your backend. Well, firstly, how does it do this?

Remember, a request has a path, a method, and sometimes a payload (aka data). And we need to send that request to our server...

### API & Actions

In **./frontend**, create an /**actions** folder and a /**utils** folder.

`npm install -S axios`

In **./utils**, create a file **api.js**

>As you add more functionality to your app, you can break the contents of this file into multiple files, organized by controller.

Copy & paste. Under `HOST`, replace the number with dots (`'###.###.#.###'`) with your IP address.

In **./actions**, create a file **auth.js** (as in _authentication_). Copy & paste.

### EXPLANATION

The API (which uses a middleware called Axios) is how we send a request to our backend. So far, we've defined 3 different requests: signing up a new user, signing in a returning user, and signing out the current user.

With this API, we can now create and modify the datafields of a row or rows (entries) in a database table (e.g. changing a user's password digest).

But we also need to handle the backend's response.

That's why we have actions. An action first makes an API call, then it handles the response. We've setup some of our actions to also handle errors.

What's the stuff above the API calls?

### Reducers

In **./reducers**, create two files: **errors.js** & **session.js**

Copy & paste.

Re-open **./reducers/root.js**. Copy & paste.

### The Redux Cycle

In **auth.js**, you'll see the function `dispatch`.

If you look at our `signOut` action, we first make an API call, then we dispatch `receiveCurrentUser(null)`. In this case, we aren't using response data from the API call; we're just setting the current user to `null` in order to sign them out. The action _is_ handling the API's response.

`dispatch` then tells our frontend that there isn't a current user. It does this with a much simpler action function, `receiveCurrentUser`, which has a type and a payload (`currentUser`, which in this case is `null`).

`dispatch` sends this object through all of our reducers, which are used to format the response data for storage on the frontend. Because only one of our reducers handles actions of type `RECEIVE_CURRENT_USER`, other reducers will not modify the slice of data they manage; only **session.js** will modify its state.

Then, all the slices of data (or, state) are combined in the **root.js** reducer.

`⌘ t` for **store.js**. Remember, we import the `rootReducer` when we create a store.

And refer back to **index.js**. There, we're importing the function that creates a store, which we set as a property of our `Setup` component.

Look at **setup.js**. Here we pass the store to a `Provider`, which makes the store (of data on our frontend) accessible to all nested components. Oh hey, our entire `App` is nested... so all of our components will be able to access the store!

So, actions both send API requests to our backend and handle responses. Reducers then update our store with the new response data. And then any component that uses that data will re-render.

That's the Redux cycle!

### Containers

Our components access the store via **containers**. A container is just code that accesses the store and imports actions, which are set as props (properties) of our component.

In **/frontend/pages** create a folder **home**

In **/frontend/pages/home** create **AuthForm.jsx**

Copy & paste.

For **Home.jsx**, copy & paste.

For **Home.js** (in **/app/javascript/components**), copy & paste.
