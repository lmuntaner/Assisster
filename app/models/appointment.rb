# == Schema Information
#
# Table name: appointments
#
#  id                 :integer          not null, primary key
#  title              :string(255)      not null
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
#

class Appointment < ActiveRecord::Base
  validates :title, :startTime, :doctor, :appointment_status,
            :fname, :lname, :email, presence: true
  validates :email, :email => true
  
  belongs_to :doctor
  
  def full_name
    "#{fname} #{lname}"
  end
  
  def date
    "#{startTime.date}"
  end
end
