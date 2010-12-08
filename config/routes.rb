RubyPhenex::Application.routes.draw do
  netzke
  root :to => "home#show"

  resources :characters
  resources :states
end
