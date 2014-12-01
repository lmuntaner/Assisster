Rails.application.routes.draw do
  root to: "patients#index"
  
  resource :session, only: [:create, :destroy]
  # resources :doctors, only: [:show]
  get "/dashboard", to: "doctors#show"
  get "/appointment", to: "patients#appointment"
  
  
  namespace :api, defaults: {format: :json} do
    resources :services, only: [:index, :show] do
      get "/:date", to: "appointments#getDateAppointments"
    end
    resources :doctors, only: [:index]
    resources :appointments, only: [:create, :update]
    resources :confirm_appointments, only: [:update]
    resources :cancel_appointments, only: [:update]
  end
end
