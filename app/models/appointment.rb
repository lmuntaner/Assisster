class Appointment < ActiveRecord::Base
  validates :title, :startTime, :doctor, presence: true
  
  belongs_to :doctor
end
