class AddPhoneNumberAppointments < ActiveRecord::Migration
  def change
    add_column :appointments, :phone_number, :string
  end
end
