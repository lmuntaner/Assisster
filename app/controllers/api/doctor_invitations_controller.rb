class Api::DoctorInvitationsController < ApplicationController

	def create
		doctor_invitation_params = params.require(:doctor_invitation).permit(:email)
		doctor_invitation = DoctorInvitation.new(doctor_invitation_params)

		if doctor_invitation.save
			doctor_invitation.send_creation_email
			render json: doctor_invitation
		else
			render json: doctor_invitation.errors.full_messages, status: :unprocessable_entity
		end
	end
end
