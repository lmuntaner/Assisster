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
  
  def get_date_available_slots
    service = Service.find(params[:service_id])
    doctor = service.doctor
    date = Date.parse(params[:date])
    appointments = get_date_appointments(doctor, date, ["Approved"], false)
    office_hours = get_date_appointments(doctor, date, ["Approved"], true)
    @available_slots = create_available_slots(service, appointments, office_hours)
    
    # @doctor.appointments.where({
    #   startTime: date.midnight..(date.midnight + 1.day),
    #   appointment_status: ["Approved", "Pending"]
    # }).order(startTime: :asc)
    
    # render :date_appointments
    render :available_slots
  end
  
  def getFreeTime
    doctor = current_doctor
    date = Date.parse(params[:date])
    appointments = get_date_appointments(doctor, date, ["Approved"], false)
    # doctor.appointments.where({
    #   startTime: date.midnight..(date.midnight + 1.day),
    #   appointment_status: ["Approved"],
    #   office_hour: false
    # }).order(startTime: :asc)
    office_hours = get_date_appointments(doctor, date, ["Approved"], true)
    # doctor.appointments.where({
    #   startTime: date.midnight..(date.midnight + 1.day),
    #   appointment_status: ["Approved"],
    #   office_hour: true
    # }).order(startTime: :asc)

    free_time_slots = create_free_slots(appointments, office_hours)
    @time_slots = appointments.concat(free_time_slots).sort { |x, y| x[:startTime] <=> y[:startTime] }
    
    render :free_time
  end
  
  private
  
  def appointment_params
    params.require(:appointment).permit(:title, :startTime, :endTime, :appointment_status,
                                        :email, :fname, :lname, :doctor_id, :phone_number,
                                        :office_hour)
  end
  
  def create_available_slots(service, appointments, office_hours)
    free_times = create_free_slots(appointments, office_hours)
    available_slots = []
    free_times.each do |free_time|
      start_time = free_time[:startTime]
      end_time = start_time + (service.duration_min * 60)
      while end_time <= free_time[:endTime]
        available_slot = {
          startTime: start_time,
          endTime: end_time,
          title: service.title
        }
        available_slots.push(available_slot)
        start_time = end_time
        end_time += (service.duration_min * 60)
      end
    end
    
    available_slots
  end
  
  def create_free_slots(appointments, office_hours)
    free_time_slots = []
    office_hours.each do |office_hour|
      end_office_hour = office_hour.endTime
      start_time = office_hour.startTime
      appointments.each do |appointment|
        end_time = appointment.startTime
        if end_time <= end_office_hour && end_time > start_time
          appointment_object = create_free_time_object(start_time, end_time)
          free_time_slots.push(appointment_object)
        elsif end_time > end_office_hour
          appointment_object = create_free_time_object(start_time, end_office_hour)
          free_time_slots.push(appointment_object)
        end
        start_time = appointment.endTime
      end
      if start_time < end_office_hour
        appointment_object = create_free_time_object(start_time, end_office_hour)
        free_time_slots.push(appointment_object)
      end
    end
    
    free_time_slots
  end
  
  def create_free_time_object(start_time, end_time)
    appointment_object = {
      startTime: start_time,
      endTime: end_time,
      title: "Free Time",
      fname: "Free Time",
      lname: ""
    }
    
    return appointment_object
  end
  
  def ensure_signed_in
    redirect_to root_url unless signed_in?
  end
  
  def get_date_appointments(doctor, date, statuses, office_hour)
    doctor.appointments.where({
          startTime: date.midnight..(date.midnight + 1.day),
          appointment_status: statuses,
          office_hour: office_hour
        }).order(startTime: :asc)
  end
end
