require 'mandrill'

class Api::ConfirmAppointmentsController < ApplicationController
  before_action :ensure_signed_in
  
  def update
    appointment = Appointment.find(params[:id])
    
    if appointment.update(appointment_status: "Approved")
      trigger_appointment_event(appointment)
      send_email(appointment, current_doctor)
      render json: appointment
    else
      render json: appointment.errors.full_messages, status: :unprocessable_entity
    end
  end
  
  def send_email(appointment, doctor)
    begin
      mandrill = Mandrill::API.new ENV["MANDRILL_API_KEY"]
      message = {
        "html"=>"<p>Appointment Confirmed!</p>",
        "text"=>"Appointment Confirmed!",
        "subject"=>"Appointment Confirmation with: ",
        "from_email"=>doctor.email,
        "from_name"=>"Doctor",
        "to"=>
          [{"email"=>appointment.email,
              "name"=>appointment.fname,
              "type"=>"to"}],
        "headers"=>{"Reply-To"=>"message.reply@example.com"}
     }
     async = true
     result = mandrill.messages.send message, async
   rescue Mandrill::Error => e
     puts "A mandrill error occurred: #{e.class} - #{e.message}"
   end
  end
end
