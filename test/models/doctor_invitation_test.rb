# == Schema Information
#
# Table name: doctor_invitations
#
#  id               :integer          not null, primary key
#  email            :string(255)      not null
#  invitation_token :string(255)
#  created_at       :datetime
#  updated_at       :datetime
#  doctor_created   :boolean          default(FALSE)
#  email_sent       :boolean          default(FALSE)
#

require 'test_helper'

class DoctorInvitationTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
