class Api::ReceiveMessagesController < ApplicationController
  
  def index
    text = params[:text]
    
    render json: "Thanks"
  end
end
