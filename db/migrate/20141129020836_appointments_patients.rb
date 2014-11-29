class AppointmentsPatients < ActiveRecord::Migration
  def change
    add_column :appointments, :email, :string
    add_column :appointments, :fname, :string
    add_column :appointments, :lname, :string
  end
end
