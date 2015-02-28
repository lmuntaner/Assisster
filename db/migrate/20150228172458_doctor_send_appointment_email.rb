class DoctorSendAppointmentEmail < ActiveRecord::Migration
  def change
  	add_column :doctors, :send_appointment_email, :boolean, default: true
  end
end
