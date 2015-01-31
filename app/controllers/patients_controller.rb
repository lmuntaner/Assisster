class PatientsController < ApplicationController
  
  def index
    Rails.logger.debug("This is the subdomain: #{request.subdomain}")
    render :index
  end
  
  def appointment
    render :new_appointment
  end
end
