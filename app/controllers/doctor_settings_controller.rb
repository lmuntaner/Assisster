class DoctorSettingsController < ApplicationController
	before_action :ensure_doctor_signed_in

	def edit
		render :edit
	end

	def update
		if current_doctor.update(doctor_params)
			redirect_to doctor_profile_path
		else
			render :edit
		end
	end

	private

	def doctor_params
		if params[:doctor][:password] == ""
			params.require(:doctor).permit(:email, :domain_name, :phone_number)
		else
			params.require(:doctor).permit(:email, :domain_name, :phone_number, :password)
		end
	end
end
