class Api::AvailableDatesController < ApplicationController
  
  def show
    @office_hours = Appointment.where({
      startTime: Date.tomorrow..Date.today.advance(years: 2),
      office_hour: true,
      appointment_status: "Confirmed",
      doctor_id: params[:id]
    })
    @dates = @office_hours.map do |office_hour|
      office_hour.startTime
    end
    
    render :show
  end
end
