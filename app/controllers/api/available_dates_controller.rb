class Api::AvailableDatesController < ApplicationController
  
  def index
    @office_hours = Appointment.where({
      startTime: Date.today..Date.today.advance(years: 2),
      office_hour: true,
      appointment_status: "Confirmed"
    })
    @dates = @office_hours.map do |office_hour|
      office_hour.startTime
    end
    
    render :index
  end
end
