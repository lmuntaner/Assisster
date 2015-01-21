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
  
  def self.send_emails
    html_msg = "<p>hello<p>"
    begin
      mandrill = Mandrill::API.new ENV["MANDRILL_API_KEY"]
      message = {
        "html"=>html_msg,
        "text"=>"hello",
        "subject"=>"whenever",
        "from_email"=>"llorenc.muntaner@gmai.com",
        "from_name"=>"whenever",
        "to"=>
          [{"email"=>"llorenc.muntaner@gmail.com",
              "name"=>"llorenc",
              "type"=>"to"}],
        "headers"=>{"Reply-To"=>"llorenc.muntaner@gmail.com"}
     }
     async = true
     result = mandrill.messages.send message, async
   rescue Mandrill::Error => e
     puts "A mandrill error occurred: #{e.class} - #{e.message}"
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
end
