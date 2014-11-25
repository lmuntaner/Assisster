class CreateDoctors < ActiveRecord::Migration
  def change
    create_table :doctors do |t|
      t.string :email, null: false
      t.string :password_digest, null: false
      t.string :dr_session_token, null: false

      t.timestamps
    end
    
    add_index :doctors, :email, unique: true
  end
end
