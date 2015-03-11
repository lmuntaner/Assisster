class Api::SendCancelMessagesController < ApplicationController
  before_action :ensure_doctor_signed_in
  
  def show
    appointment = Appointment.find(params[:id])
    message = "Lo sentimos, su cita con #{appointment.doctor.name} para #{appointment.date} a las
              #{appointment.time} no ha podido ser confirmada. Si lo desea puede pedir otra cita
              visitando #{appointment.doctor.url}. Muchas gracias."
    phone_number = appointment.full_phone
    send_message(phone_number, current_doctor, message)
    render json: appointment
  end
end
