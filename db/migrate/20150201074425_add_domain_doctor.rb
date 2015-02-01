class AddDomainDoctor < ActiveRecord::Migration
  def change
    add_column :doctors, :domain_name, :string
  end
end
