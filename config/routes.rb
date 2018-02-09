Rails.application.routes.draw do
  # Learn more at http://guides.rubyonrails.org/routing.html
  root to: 'application#home'

  # All nested routes will start with `/api`.
  # Their views will be .json files in the `app/views/api` folder.
  namespace :api, defaults: {format: :json} do
    resources :users
    resource :session, only: [:create, :destroy]
    # `resource` means these routes take no parameters in the URL.
  end
end

# rails routes (in the command line) shows all your routes.

# The above is how Rails pre-bundles routing.
# In Express (a minimalist Node.js [JavaScript] backend framework) and most other backend frameworks,
#   you'll have a file (hopefully named `server.js`) which:
#     (1) instantiates a server;
#     (2) defines routes (e.g. '/', '/api/users') with controllers (aka handlers) as their callbacks; and
#     (3) activates the server, so it listens for requests.


# Once you feel comfortable with Ruby on Rails & React, you can try out Next.js (https://learnnextjs.com/basics/getting-started)--
#   a React framework for server- & client-side rendering with a Node.js backend (such as Express).
