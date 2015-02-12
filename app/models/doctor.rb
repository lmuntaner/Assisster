# == Schema Information
#
# Table name: doctors
#
#  id               :integer          not null, primary key
#  email            :string(255)      not null
#  password_digest  :string(255)      not null
#  dr_session_token :string(255)      not null
#  created_at       :datetime
#  updated_at       :datetime
#  name             :string(255)
#  country_code     :string(255)
#  subdomain_name   :string(255)      not null
#  description      :text
#  sub_title        :string(255)
#  latitude         :float
#  longitude        :float
#  street_address   :string(255)
#  city_address     :string(255)
#  phone_number     :string(255)
#  domain_name      :string(255)
#

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

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_token!
    self.dr_session_token = create_token
    self.save!
    self.dr_session_token
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
