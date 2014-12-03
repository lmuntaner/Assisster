class Api::ReceiveMessagesController < ApplicationController
  
  def index
    text = params[:text]
    pairs_info = text.split(",").map { |item| item.split(":") }
    appointment_params = {doctor_id: 1}
    pairs_info.each do |pair|
      appointment_params[pair[0]] = pair[1]
    end
    appointment_params['startTime'] = convertToDate(appointment_params['startTime'])
    appointment_params['endTime'] = convertToDate(appointment_params['endTime'])
    
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
    parsedString = stringDate.sub!('-', ':').sub!('_', " ")
  end
end
