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

class Service < ActiveRecord::Base
  validates :title, :doctor, :duration_min, presence: true
  
  belongs_to :doctor
end
