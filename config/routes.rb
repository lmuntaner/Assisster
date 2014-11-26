Rails.application.routes.draw do
  root to: "patients#index"
  
  resource :session, only: [:create, :destroy]
  # resources :doctors, only: [:show]
  get "/dashboard", to: "doctors#show"
  
  namespace :api, defaults: {format: :json} do
    resources :doctors, only: [:index]
    resources :appointments, only: [:create, :update]
  end
end
