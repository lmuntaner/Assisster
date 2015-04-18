class DoctorWebSettingsController < ApplicationController
	before_action :ensure_doctor_signed_in

	def edit
		render :web_settings
	end

end
