class Api::ServicesController < ApplicationController
  
  def index
    @services = Service.all
    render :index
  end
  
  def show
    @service = Service.find(params[:id])
    render :show
  end
end
