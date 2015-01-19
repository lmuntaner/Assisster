class Api::SendCancelEmailsController < ApplicationController
  before_action :ensure_signed_in
  
  def show
    appointment = Appointment.find(params[:id])
    body = "Your appointment with #{current_doctor.name} has NOT been confirmed"
    subject = "Appointment Information"
    email = appointment.email
    send_email(email, appointment.full_name, current_doctor, subject, body)
    render json: appointment
  end
end
