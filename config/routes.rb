Rails.application.routes.draw do #http://guides.rubyonrails.org/routing.html

  # only client-rendered
  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :show, :update] do
      resources :interactions, only: [:create, :destroy, :update]
    end
    resources :ideas, except: [:new, :edit, :index] do
      resources :interactions, only: [:create, :destroy]
    end
    resources :comments, only: [:create, :destroy, :update] do
      resources :interactions, only: [:create, :destroy]
    end
    resources :messages, only: [:create, :destroy]
    resource :session, only: [:create, :destroy, :search] do
      get 'search', on: :collection
    end
  end

  # redirect invalid requests #

  # also server-rendered
  get '/ideas/:id', to: 'api/ideas#show'
  get '/users/:id', to: 'api/users#show'
  get '/', to: 'application#home'

end
