class Api::AvailableDatesController < ApplicationController
  
  def index
    month = params[:month].to_i
    first_day = Date.new(Date.today.year, month, 1)
    @office_hours = Appointment.where({
      startTime: first_day..first_day.end_of_month,
      office_hour: true,
      appointment_status: "Confirmed"
    })
    @dates = @office_hours.map do |office_hour|
      office_hour.startTime
    end
    
    render :index
  end
end
