class Api::AppointmentsController < ApplicationController
  before_action :ensure_signed_in, only: [:update]
  
  def create
    if (current_doctor)
      appointment = current_doctor.appointments.new(appointment_params)
    else
      appointment = Appointment.new(appointment_params)
    end
    
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
  
  def getDateAppointments
    @service = Service.find(params[:service_id])
    @doctor = @service.doctor
    date = Date.parse(params[:date])
    @appointments = @doctor.appointments.where({
      startTime: date.midnight..(date.midnight + 1.day),
      appointment_status: ["Approved", "Pending"]
    }).order(startTime: :asc)
    
    render :date_appointments
  end
  
  private
  
  def appointment_params
    params.require(:appointment).permit(:title, :startTime, :endTime, :appointment_status,
                                        :email, :fname, :lname, :doctor_id)
  end
  
  def ensure_signed_in
    redirect_to root_url unless signed_in?
  end
end
