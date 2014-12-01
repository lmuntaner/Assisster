class ChangeNameColumnStatus < ActiveRecord::Migration
  def change
    remove_column :appointments, :status
    add_column :appointments, :appointment_status, :string, default: "Pending"
  end
end
