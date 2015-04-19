class SessionsController < ApplicationController

  def create
    @doctor = Doctor.find_by_credentials(
      params[:doctor][:email],
      params[:doctor][:password]
    )

    if @doctor
      doctor_sign_in(@doctor)
      redirect_to dashboard_url
    else
      flash[:errors] = ["Invalid email or password"]
      redirect_to root_url
    end
  end

  def destroy
    doctor_sign_out
    redirect_to root_url
  end
end
