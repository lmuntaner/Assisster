class DoctorWebSettingsController < ApplicationController
	before_action :ensure_doctor_signed_in

	def edit
		render :web_settings
	end

	def update
		if current_doctor.update(doctor_web_params)
			redirect_to doctor_web_profile_path
		else
			render :web_settings
		end
	end

	private

	def doctor_web_params
		params.require(:doctor).permit(:name, :sub_title, :description, :longitude, :latitude)
	end

end
