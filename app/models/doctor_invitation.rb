# == Schema Information
#
# Table name: doctor_invitations
#
#  id               :integer          not null, primary key
#  email            :string(255)      not null
#  invitation_token :string(255)
#  created_at       :datetime
#  updated_at       :datetime
#  doctor_created   :boolean          default(FALSE)
#  email_sent       :boolean          default(FALSE)
#

require 'mandrill'

class DoctorInvitation < ActiveRecord::Base
	validates :email, presence: true
	after_initialize :ensure_invitation_token

  def doctor_has_been_created
    self.doctor_created = true
    self.save
  end

  def send_creation_email
    subject = "Email per a invitacio!"
    body = "<p>Yey!</p>"
    body += "<p>Algu se vol apuntar a Assisster!</p>"
    body += "<p>Aquest es s'email: #{self.email}</p>"
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
          [{"email"=>"llorenc@assisster.com",
              "type"=>"to"}],
        "headers"=>{"Reply-To"=>"llorenc@assisster.com"}
      }
      async = true
      result = mandrill.messages.send message, async
    rescue Mandrill::Error => e
      puts "A mandrill error occurred: #{e.class} - #{e.message}"
    end
  end

	def send_invitation_email
    subject = "Invitación Assisster prueba!"
    body = "<p>Hola!</p>"
    body += "<p>Estamos encantados de que quieras formar parte de Assisster, "
    body += "aquí tienes tu link de invitación para poder realizar la alta del servicio.</p>"
    body += "<a href='http://www.assisster.com/new_doctors/new?invitation_token#{self.invitation_token}'>"
    body += "Formulario de alta</a>"
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
              "type"=>"to"}],
        "headers"=>{"Reply-To"=>"llorenc@assisster.com"}
      }
      async = true
      result = mandrill.messages.send message, async
    rescue Mandrill::Error => e
      puts "A mandrill error occurred: #{e.class} - #{e.message}"
    end
    if invitation_token != "limonesdbest"
      self.email_sent = true
      self.save
    end
  end

	private

	def ensure_invitation_token
		self.invitation_token ||= SecureRandom.urlsafe_base64(16)
	end
end
