class CreateServices < ActiveRecord::Migration
  def change
    create_table :services do |t|
      t.string :title, null: false
      t.text :description
      t.integer :doctor_id, null: false
      t.integer :duration_min, null: false
      
      t.timestamps
    end
  end
end
