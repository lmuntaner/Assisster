require 'pusher'
require 'mandrill'

Pusher.app_id = ENV["PUSHER_APP_ID"]
Pusher.key    = ENV["PUSHER_KEY"]
Pusher.secret = ENV["PUSHER_SECRET"]

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
    
    def ensure_signed_in
      redirect_to root_url unless signed_in?
    end
    
    def trigger_appointment_event(appointment)
      Pusher.trigger('appointment-channel',
                     'appointment-event',
                     {:appointment => appointment.as_json})
    end
    
    def trigger_notification_event(notification_type, receiver, type)
      notification = {notification_type: notification_type, receiver: receiver, type: type}
      Pusher.trigger('appointment-channel',
                     'notification-event',
                     {notification: notification.as_json})
    end
    
    def send_email(email, name, doctor, subject, body)
      html_msg = "<p>#{body}<p>"
      begin
        mandrill = Mandrill::API.new ENV["MANDRILL_API_KEY"]
        message = {
          "html"=>html_msg,
          "text"=>body,
          "subject"=>subject,
          "from_email"=>doctor.email,
          "from_name"=>doctor.name,
          "to"=>
            [{"email"=>email,
                "name"=>name,
                "type"=>"to"}],
          "headers"=>{"Reply-To"=>doctor.email}
       }
       async = true
       result = mandrill.messages.send message, async
     rescue Mandrill::Error => e
       trigger_notification_event("Email", email, "danger")
       puts "A mandrill error occurred: #{e.class} - #{e.message}"
     end
     trigger_notification_event("Email", email, "success")
    end
    
    def send_message(phone_number, message)
      sms_message = URI::encode(message)
      api_key = ENV["NEXMO_API_KEY"]
      api_secret = ENV["NEXMO_API_SECRET"]
      url = "https://rest.nexmo.com/sms/json?api_key=#{api_key}&api_secret=#{api_secret}&from=12097299391&to="
      url += phone_number + "&text=" + sms_message;
      response = RestClient.get(url) do |response, request, result|
        response_hash = JSON.parse(response)
        if response_hash['messages'][0]['status'] == "0"
          trigger_notification_event("Message", phone_number, "success")
        else
          trigger_notification_event("Message", phone_number, "danger")
        end
      end
    end
end
