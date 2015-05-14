Rails.application.routes.draw do
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  root to: "patients#index"
  
  resource :session, only: [:create, :destroy]
  get "/dashboard", to: "doctors#show"
  get "/appointment", to: "patients#appointment"
  get "/profile", to: "doctor_settings#edit", as: "doctor_profile"
  get "/web_settings", to: "doctor_web_settings#edit", as: "doctor_web_profile"
  patch "/doctors/:id", to: "doctor_settings#update"
  patch "/doctors-web/:id", to: "doctor_web_settings#update"

  resources :new_doctors, only: [:new, :create]
  get "/success", to: "new_doctors#success"
  
  namespace :api, defaults: {format: :json} do
    resources :services, only: [:show, :update, :create, :destroy] do
      get "/:date", to: "appointments#get_date_available_slots"
    end
    resources :doctors, only: [:index] do
      resources :services, only: [:index]
    end
    resources :doctor_invitations, only: [:create]
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
