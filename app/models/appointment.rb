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
#  country_code       :string(255)
#

require 'mandrill'

class Appointment < ActiveRecord::Base
  validates :title, :startTime, :doctor, :appointment_status, presence: true
  validates :email, :email => true, allow_nil: true
  
  belongs_to :doctor
  
  def self.send_email_reminders
    appointments = Appointment.where({
      startTime: Date.tomorrow.midnight..Date.tomorrow.tomorrow.midnight,
      office_hour: false,
      appointment_status: "Confirmed"
    })
    appointments.each do |appointment|
      subject = "Appointment Reminder"
      body = "This is an appointment reminder"
      appointment.send_email(subject, body)
    end
  end
  
  def full_name
    "#{fname} #{lname}"
  end
  
  def date
    "#{startTime.date}"
  end
  
  def full_phone
    "#{country_code}#{phone_number}"
  end
    
  def send_email(subject, body)
    html_msg = "<p>#{body}<p>"
    doctor = self.doctor
    begin
      mandrill = Mandrill::API.new ENV["MANDRILL_API_KEY"]
      message = {
        "html"=>html_msg,
        "text"=>body,
        "subject"=>subject,
        "from_email"=>doctor.email,
        "from_name"=>doctor.name,
        "to"=>
          [{"email"=>self.email,
              "name"=>self.full_name,
              "type"=>"to"}],
        "headers"=>{"Reply-To"=>doctor.email}
     }
     async = true
     result = mandrill.messages.send message, async
   rescue Mandrill::Error => e
     puts "A mandrill error occurred: #{e.class} - #{e.message}"
   end
  end
end
