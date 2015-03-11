class Api::SendEmailsController < ApplicationController
  before_action :ensure_doctor_signed_in
  
  def create
    email = email_params["to"]
    subject = email_params["subject"]
    body = "<p>#{email_params['body']}</p>"
    send_email(email, email, current_doctor, subject, body)
    render json: email_params
  end
  
  private
  def email_params
    params.require(:email).permit(:to, :subject, :body)
  end
end
