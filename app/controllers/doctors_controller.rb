class DoctorsController < ApplicationController
  before_action :ensure_doctor_signed_in
  
  def show
    render :show
  end

  def edit
  	render :edit
  end
end
