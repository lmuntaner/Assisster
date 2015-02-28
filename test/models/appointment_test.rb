# == Schema Information
#
# Table name: appointments
#
#  id                 :integer          not null, primary key
#  title              :string(255)
#  doctor_id          :integer          not null
#  created_at         :datetime
#  updated_at         :datetime
#  email              :string(255)
#  fname              :string(255)
#  lname              :string(255)
#  startTime          :datetime
#  endTime            :datetime
#  office_hour        :boolean          default(FALSE)
#  appointment_status :string(255)      default("Pending")
#  phone_number       :string(255)
#  country_code       :string(255)
#

require 'test_helper'

class AppointmentTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
