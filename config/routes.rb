Rails.application.routes.draw do
  root to: "patients#index"
  
  resource :session, only: [:create, :destroy]
  get "/dashboard", to: "doctors#show"
  get "/appointment", to: "patients#appointment"
  
  
  namespace :api, defaults: {format: :json} do
    resources :services, only: [:index, :show, :update, :create, :destroy] do
      get "/:date", to: "appointments#get_date_available_slots"
    end
    resources :calendar_appointments, only: [:index]
    resources :doctors, only: [:index]
    resources :appointments, only: [:create, :update, :show]
    get "/free_time/:date", to: "appointments#getFreeTime"
    resources :confirm_appointments, only: [:update]
    resources :cancel_appointments, only: [:update]
    resources :receive_messages, only: [:index]
    get "/available_dates", to: "available_dates#index"
    resources :send_emails, only: [:create]
    resources :send_messages, only: [:create]
    resources :send_confirm_emails, only: [:show]
    resources :send_confirm_messages, only: [:show]
    resources :send_cancel_emails, only: [:show]
    resources :send_cancel_messages, only: [:show]
  end
end
