class OneTimeDoctorInvitation < ActiveRecord::Migration
  def change
	add_column :doctor_invitations, :doctor_created, :boolean, default: false
  	add_column :doctor_invitations, :email_sent, :boolean, default: false
  end
end
