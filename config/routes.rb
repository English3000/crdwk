Rails.application.routes.draw do #http://guides.rubyonrails.org/routing.html

  # only client-rendered
  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :update, :show]
    resources :ideas, only: [:show]
    resource :session, only: [:create, :destroy, :search] do
      get 'search', on: :collection
    end
  end

  # also server-rendered
  get '/ideas/:id', to: 'api/ideas#show'
  get '/users/:id', to: 'api/users#show'
  get '/', to: 'application#home'

end
