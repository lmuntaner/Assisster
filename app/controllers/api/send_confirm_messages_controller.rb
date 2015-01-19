class Api::SendConfirmMessagesController < ApplicationController
  before_action :ensure_signed_in
  
  def show
    appointment = Appointment.find(params[:id])
    message = "Your appointment with #{current_doctor.name} is confirmed"
    phone_number = appointment.full_phone
    send_message(phone_number, message)
    render json: appointment
  end
end
