class PatientsController < ApplicationController
  
  def index
    render :index
  end
  
  def appointment
    render :new_appointment
  end
end
