class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  helper_method :current_doctor, :signed_in?

    private
    def current_doctor
      @current_doctor ||= Doctor.find_by_dr_session_token(session[:dr_session_token])
    end

    def signed_in?
      !!current_doctor
    end

    def sign_in(doctor)
      @current_doctor = doctor
      session[:dr_session_token] = doctor.reset_token!
    end

    def sign_out
      current_doctor.try(:reset_token!)
      session[:session_token] = nil
    end

    def require_signed_in!
      redirect_to new_session_url unless signed_in?
    end
end
