# == Schema Information
#
# Table name: doctors
#
#  id                     :integer          not null, primary key
#  email                  :string(255)      not null
#  password_digest        :string(255)      not null
#  dr_session_token       :string(255)      not null
#  created_at             :datetime
#  updated_at             :datetime
#  name                   :string(255)
#  country_code           :string(255)
#  subdomain_name         :string(255)      not null
#  description            :text
#  sub_title              :string(255)
#  latitude               :float
#  longitude              :float
#  street_address         :string(255)
#  city_address           :string(255)
#  phone_number           :string(255)
#  domain_name            :string(255)
#  send_appointment_email :boolean          default(TRUE)
#

require 'test_helper'

class DoctorTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
