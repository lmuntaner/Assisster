class SessionsController < ApplicationController

  def create
    @doctor = Doctor.find_by_credentials(
      params[:doctor][:email],
      params[:doctor][:password]
    )

    if @doctor
      sign_in(@doctor)
      redirect_to doctor_url(@doctor)
    else
      flash.now[:errors] = ["Invalid email or password"]
      fail
    end
  end

  def destroy
    sign_out
    redirect_to root_url
  end
end
