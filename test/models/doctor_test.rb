# == Schema Information
#
# Table name: doctors
#
#  id               :integer          not null, primary key
#  email            :string(255)      not null
#  password_digest  :string(255)      not null
#  dr_session_token :string(255)      not null
#  created_at       :datetime
#  updated_at       :datetime
#

require 'test_helper'

class DoctorTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
