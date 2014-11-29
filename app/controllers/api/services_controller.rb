class Api::ServicesController < ApplicationController
  
  def index
    @services = Service.all
    render :index
  end
end
