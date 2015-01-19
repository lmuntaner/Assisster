class Api::SendConfirmEmailsController < ApplicationController
  before_action :ensure_signed_in
  
  def show
    appointment = Appointment.find(params[:id])
    body = "Your appointment with #{current_doctor.name} is confirmed"
    subject = "Appointment Confirmation"
    email = appointment.email
    send_email(email, appointment.full_name, current_doctor, subject, body)
    render json: appointment
  end
end
