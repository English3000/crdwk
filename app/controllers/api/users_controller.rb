class Api::UsersController < ApplicationController
  def create
    @user = User.new(user_params)
    if @user.save
      sign_in(@user)
      # can setup ActionMailer here
      render partial: 'api/sessions/user', locals: {user: @user}
    else
      render json: @user.errors.full_messages, status: 404
    end
  end

  def update
    @user = User.find_by(id: params[:id])
    @user.update_attributes(user_params) #can add constraints
    render partial: 'api/sessions/user', locals: {user: @user}
  end

  def show #SSR
    @user = User.find_by(id: params[:id])
    @user ? (render template: 'application/show') : (redirect_to '/')
  end

  def user_params
    params.require(:user).permit(:id, :name, :email, :password, :session_token,
                                 :profile_pic)
  end
end
