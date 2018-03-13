Rails.application.routes.draw do #http://guides.rubyonrails.org/routing.html

  # only client-rendered
  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :show, :update]
    resources :ideas, except: [:new, :edit, :index]
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
