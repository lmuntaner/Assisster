require 'mandrill'

class Api::ConfirmAppointmentsController < ApplicationController
  before_action :ensure_signed_in
  
  def update
    appointment = Appointment.find(params[:id])
    
    if appointment.update(appointment_status: "Confirmed")
      trigger_appointment_event(appointment)
      message = "Appointment Confirmed"
      send_email(appointment.email, appointment.full_name, current_doctor, message)
      render json: appointment
    else
      render json: appointment.errors.full_messages, status: :unprocessable_entity
    end
  end
end
