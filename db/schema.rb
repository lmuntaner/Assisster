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

ActiveRecord::Schema.define(version: 20150510073811) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_admin_comments", force: true do |t|
    t.string   "namespace"
    t.text     "body"
    t.string   "resource_id",   null: false
    t.string   "resource_type", null: false
    t.integer  "author_id"
    t.string   "author_type"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "active_admin_comments", ["author_type", "author_id"], name: "index_active_admin_comments_on_author_type_and_author_id", using: :btree
  add_index "active_admin_comments", ["namespace"], name: "index_active_admin_comments_on_namespace", using: :btree
  add_index "active_admin_comments", ["resource_type", "resource_id"], name: "index_active_admin_comments_on_resource_type_and_resource_id", using: :btree

  create_table "admin_users", force: true do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "admin_users", ["email"], name: "index_admin_users_on_email", unique: true, using: :btree
  add_index "admin_users", ["reset_password_token"], name: "index_admin_users_on_reset_password_token", unique: true, using: :btree

  create_table "appointments", force: true do |t|
    t.string   "title"
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

  create_table "doctor_invitations", force: true do |t|
    t.string   "email",                            null: false
    t.string   "invitation_token"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean  "doctor_created",   default: false
    t.boolean  "email_sent",       default: false
  end

  create_table "doctors", force: true do |t|
    t.string   "email",                                 null: false
    t.string   "password_digest",                       null: false
    t.string   "dr_session_token",                      null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "name"
    t.string   "country_code"
    t.string   "subdomain_name",                        null: false
    t.text     "description"
    t.string   "sub_title"
    t.float    "latitude"
    t.float    "longitude"
    t.string   "street_address"
    t.string   "city_address"
    t.string   "phone_number"
    t.string   "domain_name"
    t.boolean  "send_appointment_email", default: true
  end

  add_index "doctors", ["email"], name: "index_doctors_on_email", unique: true, using: :btree

  create_table "services", force: true do |t|
    t.string   "title",        null: false
    t.text     "description"
    t.integer  "doctor_id",    null: false
    t.integer  "duration_min", null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "price"
  end

end
