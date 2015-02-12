class Api::SendConfirmEmailsController < ApplicationController
  before_action :ensure_signed_in
  
  def show
    appointment = Appointment.find(params[:id])
    body = "<p>Hola #{appointment.full_name},</p>"
    body += "<p>Su cita con #{appointment.doctor.name} para el
            #{appointment.date} a las #{appointment.time} ha sido confirmada.</p>"
    body += "<p>Enviado por Assisster</p>"
    subject = "Confirmacion cita #{appointment.doctor.name}"
    email = appointment.email
    send_email(email, appointment.full_name, current_doctor, subject, body)
    render json: appointment
  end
end
