class PatientsController < ApplicationController
  
  def index
    # Rails.logger.debug("This is the subdomain: #{request.subdomain}")
    # Rails.logger.debug("This is the domain: #{request.domain}")
    @doctor = Doctor.where({ domain_name: request.domain }).first
    if !@doctor.nil?
      render :index
    else
      subdomain_request = request.subdomain
      if (subdomain_request == "www" || subdomain_request == "assisster" ||
          subdomain_request == "assisster-dev" || subdomain_request == "")
        render :home
      else
        @doctor = Doctor.where({ subdomain_name: subdomain_request }).first
        render :index
      end
    end
  end
  
  def appointment
    @doctor = Doctor.where({ domain_name: request.domain }).first
    if @doctor
      render :new_appointment
    else
      subdomain_request = request.subdomain
      if (subdomain_request == "www" || subdomain_request == "assisster" ||
          subdomain_request == "assisster-dev" || subdomain_request == "")
        redirect_to root_url
      else
        @doctor = Doctor.where({ subdomain_name: subdomain_request }).first
        render :new_appointment
      end
    end
  end
end
