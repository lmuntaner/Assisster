# == Schema Information
#
# Table name: appointments
#
#  id         :integer          not null, primary key
#  title      :string(255)      not null
#  doctor_id  :integer          not null
#  created_at :datetime
#  updated_at :datetime
#  startTime  :datetime         not null
#  endTime    :datetime
#

require 'test_helper'

class AppointmentTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
