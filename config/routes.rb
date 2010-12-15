RubyPhenex::Application.routes.draw do
  netzke
  root to: "home#show"

  resources :characters do
    resources :states, controller: 'characters/states' do
      resources :phenotypes
    end
  end

  resources :ontologies do
    resources :terms, controller: 'ontologies/terms' do
      collection do
        get :search
      end
    end
  end

  resource :remote do
    resource :bioportal do
      resources :ontologies do
        resources :terms, controller: 'ontologies/terms'
      end
    end
  end
end
