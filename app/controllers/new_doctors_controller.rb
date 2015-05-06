class NewDoctorsController < ApplicationController

	def new
		@doctor_invitation = DoctorInvitation.find_by_invitation_token(params[:invitation_token])
		if @doctor_invitation.nil?
			redirect_to root_url
		else
			render :new
		end
	end

	def create
		doctor = Doctor.new(doctor_params)
		doctor_invitation = DoctorInvitation.find_by_email(doctor.email)

		if doctor.save
			redirect_to success_url
		else
			flash[:errors] = doctor.errors.messages
			redirect_to new_new_doctor_url(host: request.host, invitation_token: doctor_invitation.invitation_token)
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
