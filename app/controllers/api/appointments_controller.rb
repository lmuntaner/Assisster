class Api::AppointmentsController < ApplicationController
  before_action :ensure_signed_in, only: [:update, :show, :getFreeTime]
  
  def show
    @appointment = Appointment.find(params[:id])
    render :show
  end
  
  def create
    if (current_doctor)
      appointment = current_doctor.appointments.new(appointment_params)
    else
      appointment = Appointment.new(appointment_params)
    end
    
    if appointment.save
      trigger_appointment_event(appointment)
      render json: appointment
    else
      render json: appointment.errors.full_messages, status: :unprocessable_entity
    end
  end
  
  def update
    appointment = Appointment.find(params[:id])
    
    if appointment.update(appointment_params)
      trigger_appointment_event(appointment)
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
  
  def getFreeTime
    doctor = current_doctor
    date = Date.parse(params[:date])
    appointments = doctor.appointments.where({
      startTime: date.midnight..(date.midnight + 1.day),
      appointment_status: ["Approved", "Pending"],
      office_hour: false
    }).order(startTime: :asc)
    office_hours = doctor.appointments.where({
      startTime: date.midnight..(date.midnight + 1.day),
      office_hour: true
    }).order(startTime: :asc)

    free_time_slots = createFreeSlots(office_hours, appointments)
    @time_slots = appointments.concat(free_time_slots).sort { |x, y| x[:startTime] <=> y[:startTime] }
    
    render :free_time
  end
  
  private
  
  def appointment_params
    params.require(:appointment).permit(:title, :startTime, :endTime, :appointment_status,
                                        :email, :fname, :lname, :doctor_id, :phone_number,
                                        :office_hour)
  end
  
  def createFreeSlots(office_hours, appointments)
    free_time_slots = []
    office_hours.each do |office_hour|
      end_office_hour = office_hour.endTime
      start_time = office_hour.startTime
      appointments.each do |appointment|
        end_time = appointment.startTime
        if end_time <= end_office_hour && end_time > start_time
          appointment_object = {
            startTime: start_time,
            endTime: end_time,
            title: "Free Time",
            fname: "Free Time",
            lname: ""
          }
          free_time_slots.push(appointment_object)
        end
        start_time = appointment.endTime
      end
      if start_time < end_office_hour
        appointment_object = {
          startTime: start_time,
          endTime: end_office_hour,
          title: "Free Time",
          fname: "Free Time",
          lname: ""
        }
        free_time_slots.push(appointment_object)
      end
    end
    
    free_time_slots
  end
  
  def ensure_signed_in
    redirect_to root_url unless signed_in?
  end
end
