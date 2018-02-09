class Api::SessionsController < ApplicationController
  def destroy # when a user signs out, end the session
    unless signed_in?
      render status: 404
    end
    sign_out
    render {}
  end

  def create # when a user signs in, create a session in the browser
    @user = User.find_by_credentials(params[:user][:username], params[:user][:password])
    if @user
      sign_in(@user)
      render json: @user
    else
      render json: ['Invalid user credentials'], status: 422
    end
  end
end
