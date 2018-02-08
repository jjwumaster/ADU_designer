Rails.application.routes.draw do
  namespace :api do
    resources :users, :adus, :properties
    post '/auth', to: 'auth#create'
    post '/suggest', to: 'suggestions#suggest'
    post '/query', to: 'api_queries#query'
  end
end
