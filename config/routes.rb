Rails.application.routes.draw do
  root to: "patients#index"
  
  resource :session, only: [:create, :destroy]
  get "/dashboard", to: "doctors#show"
  get "/appointment", to: "patients#appointment"
  
  
  namespace :api, defaults: {format: :json} do
    resources :services, only: [:index, :show] do
      get "/:date", to: "appointments#getDateAppointments"
    end
    resources :calendar_appointments, only: [:index]
    resources :doctors, only: [:index]
    resources :appointments, only: [:create, :update, :show]
    get "/free_time/:date", to: "appointments#getFreeTime"
    resources :confirm_appointments, only: [:update]
    resources :cancel_appointments, only: [:update]
    resources :receive_messages, only: [:index]
  end
end
