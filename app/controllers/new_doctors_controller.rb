class NewDoctorsController < ApplicationController

	def new
		render :new
	end

	def create
		if Doctor.create(doctor_params)
			redirect_to success_path
		else
			render :new
		end
	end

	def success
	end

	private

	def doctor_params
		params.require(:doctor).permit(:email, :phone_number, :subdomain_name, :domain_name,
										:password, :name, :sub_title, :description,
										:latitude, :longitude, :street_address, :city_address)
	end
end
