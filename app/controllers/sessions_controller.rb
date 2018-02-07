class SessionsController < ApplicationController
  def destroy
    unless signed_in?
      render status: 404
    end
    sign_out
    render {}
  end

  def create # a session for returning user
    @user = User.find_by_credentials(params[:user][:username], params[:user][:password])
    if @user
      sign_in(@user)
      render json: @user
    else
      render json: ['Invalid user credentials'], status: 422
    end
  end
end
