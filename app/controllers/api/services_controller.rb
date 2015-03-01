class Api::ServicesController < ApplicationController
  before_action :ensure_signed_in, only: [:create, :update, :destroy]
  
  def index
    @services = Service.where({ doctor_id: params[:doctor_id] })
    render :index
  end
  
  def show
    @service = Service.find(params[:id])
    render :show
  end
  
  def create
    service = current_doctor.services.new(service_params)
    
    if service.save
      render json: service
    else
      render json: service.errors.full_messages, status: :unprocessable_entity
    end
  end
  
  def update
    service = Service.find(params[:id])
    
    if service.update(service_params)
      render json: service
    else
      render json: service.errors.full_messages, status: :unprocessable_entity
    end
  end
  
  def destroy
    service = Service.find(params[:id])
    service.destroy
    
    render json: service
  end
  
  private
  
  def service_params
    params.require(:service).permit(:title, :duration_min, :description, :price)
  end
end
