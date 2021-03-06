class Api::SendMessagesController < ApplicationController
  before_action :ensure_doctor_signed_in
  
  def create
    phone_number = sms_params["phone_number"]
    message = sms_params["message"]
    send_message(phone_number, current_doctor, message)
    render json: sms_params
  end
  
  private
  def sms_params
    params.require(:sms).permit(:phone_number, :message)
  end
end
