class Api::SendCancelEmailsController < ApplicationController
  before_action :ensure_signed_in
  
  def show
    appointment = Appointment.find(params[:id])
    body = "<p>Hola #{appointment.full_name},</p>"
    body += "<p>Su cita con #{appointment.doctor.name} para el
            #{appointment.date} a las #{appointment.time} no ha podido ser confirmada.</p>"
    body += "Si lo desea puede pedir otra cita visitando #{appointment.doctor.url}"
    body += "<p>Enviado por Assisster</p>"
    subject = "Cancelacion cita #{appointment.doctor.name}"
    subject = "Appointment Information"
    email = appointment.email
    send_email(email, appointment.full_name, current_doctor, subject, body)
    render json: appointment
  end
end
