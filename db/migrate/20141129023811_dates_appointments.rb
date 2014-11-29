class DatesAppointments < ActiveRecord::Migration
  def change
    remove_column :appointments, :startTime
    remove_column :appointments, :endTime
    add_column :appointments, :startTime, :timestamp
    add_column :appointments, :endTime, :timestamp
  end
end
