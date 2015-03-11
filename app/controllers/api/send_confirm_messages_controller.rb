class Api::SendConfirmMessagesController < ApplicationController
  before_action :ensure_doctor_signed_in
  
  def show
    appointment = Appointment.find(params[:id])
    message = "Su cita con #{appointment.doctor.name} para el #{appointment.date} a las
              #{appointment.time} ha sido confirmada. Muchas gracias."
    phone_number = appointment.full_phone
    send_message(phone_number, current_doctor, message)
    render json: appointment
  end
end
