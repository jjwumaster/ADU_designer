Rails.application.routes.draw do
  namespace :api do
    resources :users, :adus, :properties
    post '/auth', to: 'auth#create'
    post '/suggest', to: 'suggestions#suggest'
    post '/query', to: 'api_queries#query'
    get '/current_user', to: 'auth#show'
    post '/save_property', to: 'user_properties#create'
    post '/delete_property', to: 'user_properties#destroy'
    post '/get_property', to: 'properties#get'
    post '/is_property_saved', to: 'user_properties#find'
  end
end
