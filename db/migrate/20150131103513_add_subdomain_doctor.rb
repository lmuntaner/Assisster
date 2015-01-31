class AddSubdomainDoctor < ActiveRecord::Migration
  def change
    add_column :doctors, :subdomain_name, :string, null: false
  end
end
