class Api::DoctorInvitationsController < ApplicationController

	def create
		doctor_invitation_email = params.require(:doctor_invitation).permit(:email)
		doctor_invitation = DoctorInvitation.new(email: doctor_invitation_email)

		if doctor_invitation.save
			render :json doctor_invitation_email
		else
			render json: doctor_invitation.errors.full_messages, status: :unprocessable_entity
		end
	end
end
