# == Schema Information
#
# Table name: services
#
#  id           :integer          not null, primary key
#  title        :string(255)      not null
#  description  :text
#  doctor_id    :integer          not null
#  duration_min :integer          not null
#  created_at   :datetime
#  updated_at   :datetime
#

require 'test_helper'

class ServiceTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
