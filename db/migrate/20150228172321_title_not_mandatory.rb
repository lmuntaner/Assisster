class TitleNotMandatory < ActiveRecord::Migration
  def change
  	change_column :appointments, :title, :string, :null => true
  end
end
