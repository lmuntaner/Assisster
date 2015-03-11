class Api::SendCreateEmailsController < ApplicationController
  before_action :ensure_doctor_signed_in
  
  def show
    appointment = Appointment.find(params[:id])
    body = "<p>Hola #{appointment.full_name},</p>"
    body += "<p>Tiene una nueva cita con #{appointment.doctor.name} para el
            #{appointment.date} a las #{appointment.time}.</p>"
    body += "<p>Gracias,</p>"
    body += "<p>Enviado por Assisster</p>"
    subject = "Nueva cita: #{appointment.doctor.name}"
    email = appointment.email
    send_email(email, appointment.full_name, current_doctor, subject, body)
    render json: appointment
  end
end