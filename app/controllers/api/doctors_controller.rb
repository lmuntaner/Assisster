class Api::DoctorsController < ApplicationController
  before_action :ensure_signed_in
  
  def index
    @doctor = current_doctor
    
    render :index
  end
end
