class PatientsController < ApplicationController
  
  def index
    # Rails.logger.debug("This is the subdomain: #{request.subdomain}")
    @doctor = Doctor.where({ subdomain_name: request.subdomain }).first
    render :index
  end
  
  def appointment
    @doctor = Doctor.where({ subdomain_name: request.subdomain }).first
    render :new_appointment
  end
end
