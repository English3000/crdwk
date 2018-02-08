## User Authentication Backend (Ruby on Rails)

`rails g controller Api::Users`

`rails g model User email:string password_digest:string session_token:string`

`⌘ t` in Atom. Type _users_ & select **db/migrate/** + time of migration + **create_users.rb**. Copy & paste.

`⌘ t` _user.rb_, copy & paste.

`⌘ t` _Gemfile_, uncomment `gem 'bcrypt'`

`⌘ t` _application_controller.rb_, copy & paste.

`rails g controller Api::Sessions`

`⌘ t` _users_controller.rb_, copy & paste.

`⌘ t` _sessions_controller.rb_, copy & paste.

`⌘ t` _routes.rb_, copy & paste.

>`rails db:create`

`rails db:migrate`

## User Authentication Frontend (React/Redux)

# Skip to coding instructions

**EXPLANATION**

The reason to even have a backend is to make your website dynamic.

If you just hosted a frontend (HTML + CSS + JavaScript), your website would be "static"--a user couldn't do anything to change what they see on your site. The only way for your site to change would be if you changed the code.

With a backend, you can customize what each user sees. This is achieved by recording users in a database table (as we just setup on the backend) and associating other data with a particular user's unique id.

So here's what we just did:

As a reminder, the backend connects the frontend and your database. So when a request is made to sign up (as a brand new user), sign in, or sign out, `routes.rb` will point that request to either the UsersController or SessionsController.

A request consists of a path (e.g. `/api/users`), an action/method (e.g. `POST`), and sometimes a payload (e.g. a user's email & password).

`/api/users` will be matched to the UsersController. Because the request's method is `POST`, the controller will then `create` a new user, saving it to the database and sending back some of the user's info--filtered down with a view _(or as a JavaScript object, which is a data structure that looks like_ `{key: 'value'}`_)_--to the frontend.

Migrations create or modify tables in the database. They can include constraints, such as that all users' emails must be unique.

Models also can have constraints, for example that a password must be at least 8 characters long.

If these constraints aren't met, the action to the database will fail. That's why you see some `if/else` logic for handling potential errors.

Models can also have associations--methods that access data associated with a user, for example, from the database.

Controllers can also have non-routing/non-database methods, such as checking whether there is currently a user signed in.

~ ~ ~

On the frontend, we need a way to send requests to the backend and we also need a way to handle its responses. That's where React and Redux come in.

React allows you to code out your webpages entirely in JavaScript (with a special kind of XML). This means you can have your layout, styling, and interactive scripting (aka event handlers) all in the same file (in what's called a component).

Let's say you have a component with a form, and when you click the button, the event handler sends a request to your backend. Well, firstly, how does it do this?

Remember, a request has a path, a method, and sometimes a payload (aka data). And we need to send that request to our server...

### Actions & API
