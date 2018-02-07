## User Authentication (Ruby on Rails)

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
