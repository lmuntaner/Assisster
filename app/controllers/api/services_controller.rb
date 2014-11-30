class Api::ServicesController < ApplicationController
  
  def index
    @services = Service.all
    render :index
  end
  
  def show
    @service = Service.find(params[:id])
    render :show
  end
  
  def getFreeSlots
    @service = Service.find(params[:service_id])
    @doctor = @service.doctor
    
  end
end
