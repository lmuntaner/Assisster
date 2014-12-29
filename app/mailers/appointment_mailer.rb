class AppointmentMailer < ActionMailer::Base
  default from: "from@example.com"
  
  def confirmation_email(appointment)
    @name = appointment.full_name
    @doctor = Doctor.find(appointment.doctor_id)
    @appointment = appointment
    mail(to: @appointment.email, subject: "Appointment Confirmation")
  end
end
