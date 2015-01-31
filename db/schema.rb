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

ActiveRecord::Schema.define(version: 20150131125146) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "appointments", force: true do |t|
    t.string   "title",                                  null: false
    t.integer  "doctor_id",                              null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "email"
    t.string   "fname"
    t.string   "lname"
    t.datetime "startTime"
    t.datetime "endTime"
    t.boolean  "office_hour",        default: false
    t.string   "appointment_status", default: "Pending"
    t.string   "phone_number"
    t.string   "country_code"
  end

  add_index "appointments", ["doctor_id"], name: "index_appointments_on_doctor_id", using: :btree

  create_table "doctors", force: true do |t|
    t.string   "email",            null: false
    t.string   "password_digest",  null: false
    t.string   "dr_session_token", null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "name"
    t.string   "country_code"
    t.string   "subdomain_name",   null: false
    t.text     "description"
    t.string   "sub_title"
    t.float    "latitude"
    t.float    "longitude"
    t.string   "street_address"
    t.string   "city_address"
    t.string   "phone_number"
  end

  add_index "doctors", ["email"], name: "index_doctors_on_email", unique: true, using: :btree

  create_table "services", force: true do |t|
    t.string   "title",        null: false
    t.text     "description"
    t.integer  "doctor_id",    null: false
    t.integer  "duration_min", null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
