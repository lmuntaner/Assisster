class Api::CalendarAppointmentsController < ApplicationController
  before_action :ensure_doctor_signed_in
  
  def index
    @appointments = current_doctor.appointments.where({
      appointment_status: "Approved"
    });
    
    return :index
  end
end
