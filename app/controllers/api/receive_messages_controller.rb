class Api::ReceiveMessagesController < ApplicationController
  
  def index
    text = params[:text]
    pairs_info = text.split(",").map { |item| item.split(":") }
    appointment_params = {doctor_id: 1}
    pairs_info.each do |pair|
      appointment_params[pair[0].to_sym] = pair[1]
    end
    start_string = convertToDate(appointment_params[:startTime])
    end_string = convertToDate(appointment_params[:endTime])
    appointment_params[:startTime] = start_string
    appointment_params[:endTime] = end_string
    
    appointment = Appointment.new(appointment_params)
    
    if appointment.save
      trigger_appointment_event(appointment)
      render json: "Thanks success"
    else
      render json: "Thanks wrong"
      # render json: appointment.errors.full_messages, status: :unprocessable_entity
    end
    
  end
  
  private
  
  def convertToDate(stringDate)
    parsedString = stringDate.sub!('-', ':')
  end
end
