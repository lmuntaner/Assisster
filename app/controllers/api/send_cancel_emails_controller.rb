class Api::SendCancelEmailsController < ApplicationController
  before_action :ensure_doctor_signed_in
  
  def show
    appointment = Appointment.find(params[:id])
    body = "<p>Hola #{appointment.full_name},</p>"
    body += "<p>Lo sentimos, su cita con #{appointment.doctor.name} para el
            #{appointment.date} a las #{appointment.time} ha sido cancelada.</p>"
    body += "<p>Si lo desea puede pedir otra cita visitando #{appointment.doctor.url}</p>"
    body += "<p>Gracias,</p>"
    body += "<p>Enviado por Assisster</p>"
    subject = "Cancelacion cita #{appointment.doctor.name}"
    email = appointment.email
    send_email(email, appointment.full_name, current_doctor, subject, body)
    render json: appointment
  end
end
