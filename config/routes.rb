Rails.application.routes.draw do

  root to: 'pages#index' # this is the React app i.e. '/'

  get "/login" => "session#new"

  post "/login" => "session#create"
  delete "/login" => "session#destroy"

  get '/search' => "pages#search"

  




  resources :users

end
