class PatientsController < ApplicationController
  
  def index
    # Rails.logger.debug("This is the subdomain: #{request.subdomain}")
    subdomain_request = request.subdomain
    if (subdomain_request == "www" || subdomain_request == "assisster")
      render :home
    else
      @doctor = Doctor.where({ subdomain_name: subdomain_request }).first
      render :index
    end
  end
  
  def appointment
    @doctor = Doctor.where({ subdomain_name: request.subdomain }).first
    render :new_appointment
  end
end
