# == Schema Information
#
# Table name: doctor_invitations
#
#  id               :integer          not null, primary key
#  email            :string(255)      not null
#  invitation_token :string(255)
#  created_at       :datetime
#  updated_at       :datetime
#

require 'mandrill'

class DoctorInvitation < ActiveRecord::Base
	validates :email, presence: true
	after_initialize :ensure_invitation_token

	def invitation_link
		"http://www.asssisster.com/new_doctors/new?invitation_token=#{self.invitation_token}"
	end

	def send_invitation_email
    subject = "Invitación Assisster prueba!"
    body = "<p>Hola!</p>"
    body += "<p>Estamos encantados de que quieras formar parte de Assisster, "
    body += "aquí tienes tu link de invitación para poder realizar la alta del servicio.</p>"
    body += "<a href='#{self.invitation_link}'>"
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
  end

	private

	def ensure_invitation_token
		self.invitation_token ||= SecureRandom.urlsafe_base64(16)
	end
end
