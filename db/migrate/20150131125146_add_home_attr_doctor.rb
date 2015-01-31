class AddHomeAttrDoctor < ActiveRecord::Migration
  def change
    add_column :doctors, :description, :text
    add_column :doctors, :sub_title, :string
    add_column :doctors, :latitude, :float
    add_column :doctors, :longitude, :float
    add_column :doctors, :street_address, :string
    add_column :doctors, :city_address, :string
    add_column :doctors, :phone_number, :string
  end
end
