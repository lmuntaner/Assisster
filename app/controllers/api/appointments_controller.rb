class Api::AppointmentsController < ApplicationController
  before_action :ensure_signed_in
  
  def create
    appointment = current_doctor.appointments.new(appointment_params)
    
    if appointment.save
      render json: appointment
    else
      render json: appointment.errors.full_messages, status: :unprocessable_entity
    end
  end
  
  def update
    appointment = Appointment.find(params[:id])
    
    if appointment.update(appointment_params)
      render json: appointment
    else
      render json: appointment.errors.full_messages, status: :unprocessable_entity
    end
  end
  
  private
  
  def appointment_params
    params.require(:appointment).permit(:title, :startTime, :endTime)
  end
  
  def ensure_signed_in
    redirect_to root_url unless signed_in?
  end
end
