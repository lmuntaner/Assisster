class CreateDoctorInvitations < ActiveRecord::Migration
  def change
    create_table :doctor_invitations do |t|
    	t.string :email, null: false
    	t.string :invitation_token

      t.timestamps
    end
  end
end
