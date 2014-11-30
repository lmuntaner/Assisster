# == Schema Information
#
# Table name: appointments
#
#  id          :integer          not null, primary key
#  title       :string(255)      not null
#  doctor_id   :integer          not null
#  created_at  :datetime
#  updated_at  :datetime
#  email       :string(255)
#  fname       :string(255)
#  lname       :string(255)
#  startTime   :datetime
#  endTime     :datetime
#  office_hour :boolean          default(FALSE)
#

class Appointment < ActiveRecord::Base
  validates :title, :startTime, :doctor, presence: true
  
  belongs_to :doctor
end
