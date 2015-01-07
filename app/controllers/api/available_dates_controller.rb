class Api::AvailableDatesController < ApplicationController
  
  def index
    today = Date.today
    @office_hours = Appointment.where({
      startTime: today.beginning_of_month..today.end_of_month,
      office_hour: true,
      appointment_status: "Approved"
    })
    @dates = @office_hours.map do |office_hour|
      office_hour.startTime
    end
    
    render :index
  end
end
