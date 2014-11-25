Rails.application.routes.draw do
  root to: "patients#index"
  
  resource :session, only: [:create, :destroy]
  resources :doctors, only: [:show]
end
