# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20141126164216) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "appointments", force: true do |t|
    t.string   "title",      null: false
    t.date     "startTime",  null: false
    t.date     "endTime"
    t.integer  "doctor_id",  null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "appointments", ["doctor_id"], name: "index_appointments_on_doctor_id", using: :btree

  create_table "doctors", force: true do |t|
    t.string   "email",            null: false
    t.string   "password_digest",  null: false
    t.string   "dr_session_token", null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "doctors", ["email"], name: "index_doctors_on_email", unique: true, using: :btree

end
