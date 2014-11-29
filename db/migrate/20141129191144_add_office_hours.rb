class AddOfficeHours < ActiveRecord::Migration
  def change
    add_column :appointments, :office_hour, :boolean, default: false
  end
end
