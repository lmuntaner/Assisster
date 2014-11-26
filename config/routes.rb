Rails.application.routes.draw do
  root to: "patients#index"
  
  resource :session, only: [:create, :destroy]
  resources :doctors, only: [:show]
  
  namespace :api do
    resources :doctors, default: {format: :json}, only: [:show] do
      resources :appointments, only: [:create, :update]
    end
  end
end
