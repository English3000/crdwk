class Api::UsersController < ApplicationController
  def create # a new user
    @user = User.new(user_params)
    if @user.save #to database
      sign_in(@user)
      render json: @user
    else
      render json: @user.errors.full_messages, status: 404
    end
  end

  def user_params
    params.require(:user).permit(:id, :email, :password, :session_token)
  end
end
