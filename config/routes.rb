Rails.application.routes.draw do #http://guides.rubyonrails.org/routing.html
  # also server-rendered
  get '/users/:id', to: 'api/users#show'
  get '/', to: 'application#home'

  # only client-rendered
  namespace :api, defaults: {format: :json} do
    resources :users, except: [:new]
    resource :session, only: [:create, :destroy, :search] do
      get 'search', on: :collection
    end
  end
end
