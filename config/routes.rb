RubyPhenex::Application.routes.draw do
  netzke
  root to: "home#show"

  resources :characters do
    resources :states, controller: 'characters/states'
  end

  resources :ontologies
end
