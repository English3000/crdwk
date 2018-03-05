Rails.application.routes.draw do #http://guides.rubyonrails.org/routing.html

  # only client-rendered
  namespace :api, defaults: {format: :json} do
    resources :users, except: [:new, :show]
    # resources :ideas, only: [:show]
    resource :session, only: [:create, :destroy, :search] do
      get 'search', on: :collection
    end
  end

  # also server-rendered
  get '/users/:id', to: 'api/users#show'
  get '/', to: 'application#home'

end
