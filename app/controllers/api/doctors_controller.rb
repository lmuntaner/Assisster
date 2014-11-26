class Api::DoctorsController < ApplicationController
  before_action :ensure_signed_in
  
  def index
    @doctor = current_doctor
    
    render :index
  end
  
  private
  def ensure_signed_in
    redirect_to root_url unless signed_in?
  end
end
