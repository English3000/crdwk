class Api::SessionsController < ApplicationController
  def destroy
    sign_out
    render json: {currentUser: current_user}
  end

  def create
    @user = User.find_by_credentials(params[:user][:email], params[:user][:password])
    if @user
      sign_in(@user)
      render partial: 'user', locals: {user: @user, current: true}
    else
      render json: ['Invalid credentials: user not found'], status: 422
    end
  end
end
