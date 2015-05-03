class DoctorsController < ApplicationController
  before_action :ensure_doctor_signed_in, only: [:show]
  
  def show
    render :show
  end
  
end
