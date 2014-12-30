class AddNameAndCountryDoctor < ActiveRecord::Migration
  def change
    add_column :doctors, :name, :string
    add_column :doctors, :country_code, :string
  end
end
