class CreateAppointments < ActiveRecord::Migration
  def change
    create_table :appointments do |t|
      t.string :title, null: false
      t.date :startTime, null: false
      t.date :endTime
      t.integer :doctor_id, null: false

      t.timestamps
    end
    
    add_index :appointments, :doctor_id
  end
end
