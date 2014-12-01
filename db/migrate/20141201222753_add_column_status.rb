class AddColumnStatus < ActiveRecord::Migration
  def change
    add_column :appointments, :status, :string, default: "Pending"
  end
end
