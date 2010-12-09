RubyPhenex::Application.routes.draw do
  netzke
  root to: "home#show"

  resources :characters do
    resources :states, controller: 'characters/states' do
      resources :phenotypes
    end
  end

  resources :ontologies
end
