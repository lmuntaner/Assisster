# == Schema Information
#
# Table name: doctors
#
#  id                     :integer          not null, primary key
#  email                  :string(255)      not null
#  password_digest        :string(255)      not null
#  dr_session_token       :string(255)      not null
#  created_at             :datetime
#  updated_at             :datetime
#  name                   :string(255)
#  country_code           :string(255)
#  subdomain_name         :string(255)      not null
#  description            :text
#  sub_title              :string(255)
#  latitude               :float
#  longitude              :float
#  street_address         :string(255)
#  city_address           :string(255)
#  phone_number           :string(255)
#  domain_name            :string(255)
#  send_appointment_email :boolean          default(TRUE)
#

require 'mandrill'

class Doctor < ActiveRecord::Base
  validates :email, :password_digest, :dr_session_token, presence: true
  validates :password, length: { minimum: 6, allow_nil: true }
  validates :email, :dr_session_token, uniqueness: true
  
  has_many :appointments
  has_many :services
  
  attr_reader :password
  
  after_initialize :ensure_session_token

  def self.find_by_credentials(email, password)
    doctor = Doctor.find_by(email: email)
    return nil unless doctor && doctor.is_password?(password)
    doctor
  end

  def change_password(password)
    self.password= password
    self.save!
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def reset_token!
    self.dr_session_token = create_token
    self.save!
    self.dr_session_token
  end

  def send_email(appointment)
    return unless self.send_appointment_email
    subject = "Nueva cita"
    body = "<p>Hola #{self.name},</p>"
    body += "<p>Acabas de recibir una nueva cita de #{appointment.full_name} "
    body += "para el #{appointment.date} a las #{appointment.time}.</p>"
    body += "<p>Gracias.</p>"
    body += "<p>Enviado por Assisster.</p>"
    html_msg = body
    begin
      mandrill = Mandrill::API.new ENV["MANDRILL_API_KEY"]
      message = {
        "html"=>html_msg,
        "text"=>body,
        "subject"=>subject,
        "from_email"=>"llorenc@assisster.com",
        "from_name"=>"Assisster",
        "to"=>
          [{"email"=>self.email,
              "name"=>self.name,
              "type"=>"to"}],
        "headers"=>{"Reply-To"=>"llorenc@assisster.com"}
     }
     async = true
     result = mandrill.messages.send message, async
   rescue Mandrill::Error => e
     puts "A mandrill error occurred: #{e.class} - #{e.message}"
   end
  end
  
  def url
    if self.domain_name
      return "www.#{self.domain_name}"
    else
      return "#{self.subdomain_name}.assisster.com"
    end
  end

  private
  def ensure_session_token
    self.dr_session_token ||= SecureRandom.urlsafe_base64(16)
  end
  
  def create_token
    SecureRandom.urlsafe_base64(16)
  end
end
