class Api::SendCancelMessagesController < ApplicationController
  before_action :ensure_signed_in
  
  def show
    appointment = Appointment.find(params[:id])
    message = "<p>Your appointment with #{current_doctor.name} has NOT been confirmed</p>"
    phone_number = appointment.full_phone
    send_message(phone_number, current_doctor, message)
    render json: appointment
  end
end
