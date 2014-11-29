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

class Appointment < ActiveRecord::Base
  validates :title, :startTime, :doctor, presence: true
  
  belongs_to :doctor
end
