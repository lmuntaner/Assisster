Rails.application.routes.draw do
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  root to: "patients#index"
  
  resource :session, only: [:create, :destroy]
  get "/dashboard", to: "doctors#show"
  get "/appointment", to: "patients#appointment"
  get "/profile", to: "doctors#edit"
  get "/web_settings", to: "doctors#edit"
  
  
  namespace :api, defaults: {format: :json} do
    resources :services, only: [:show, :update, :create, :destroy] do
      get "/:date", to: "appointments#get_date_available_slots"
    end
    resources :doctors, only: [:index] do
      resources :services, only: [:index]
    end
    resources :appointments, only: [:create, :update, :show]
    get "/free_time/:date", to: "appointments#getFreeTime"
    resources :send_doctor_appointment_emails, only: [:create]
    resources :confirm_appointments, only: [:update]
    resources :cancel_appointments, only: [:update]
    resources :receive_messages, only: [:index]
    resources :available_dates, only: [:show]
    resources :send_emails, only: [:create]
    resources :send_messages, only: [:create]
    resources :send_confirm_emails, only: [:show]
    resources :send_create_emails, only: [:show]
    resources :send_update_emails, only: [:show]
    resources :send_confirm_messages, only: [:show]
    resources :send_cancel_emails, only: [:show]
    resources :send_cancel_messages, only: [:show]
  end
end
