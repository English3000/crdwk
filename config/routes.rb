Rails.application.routes.draw do #http://guides.rubyonrails.org/routing.html
  # also server-rendered
  get '/users/:id', to: 'api/users#show'
  get '/', to: 'application#home'

  # only client-rendered
  namespace :api, defaults: {format: :json} do
    resources :users, except: [:new]
    resource :session, only: [:create, :destroy]
  end

  match "*path", :to => proc {|env| [200, {
    'Access-Control-Allow-Origin' => '*',
    'Access-Control-Allow-Methods' => 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Credentials' => 'true',
    'Access-Control-Request-Method' => '*',
    'Access-Control-Allow-Headers' => 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    'Content-Type' => 'text/plain'
   }, ["CORS Preflight"]] }, :via => [:delete]
end
