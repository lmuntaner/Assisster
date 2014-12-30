class AddCountryCodeAppointment < ActiveRecord::Migration
  def change
    add_column :appointments, :country_code, :string
  end
end
