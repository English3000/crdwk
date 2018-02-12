Rails.application.routes.draw do
  # Learn more at http://guides.rubyonrails.org/routing.html
  get '/users/:id', to: 'api/users#show'

  namespace :api, defaults: {format: :json} do
    resources :users
    resource :session, only: [:create, :destroy]
  end

  get '/', to: 'application#home'
end
