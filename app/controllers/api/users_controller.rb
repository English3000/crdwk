class Api::UsersController < ApplicationController
  def index
    @users = User.where("LOWER(users.name) LIKE ?", '%' + params['query'].downcase + '%')
  end

  def create
    @user = User.new(user_params)
    if @user.save
      sign_in(@user)
      # can setup ActionMailer here
      render partial: 'api/sessions/user', locals: {user: @user, current: true}
    else
      render json: @user.errors.full_messages, status: 404
    end
  end

  def update
    @user = User.find_by(id: params[:id])
    @user.update_attributes(user_params) #can add constraints
    render partial: 'api/sessions/user', locals: {user: @user, current: true}
  end

  def show
    @user = User.find_by(id: params[:id])
    if @user && visited # can test once Search implemented
      render json: {id: @user.id, email: @user.email}
    elsif @user
      visited = true
      render :show
    else
      visited = true
      redirect_to '/'
    end
  end

  def user_params
    params.require(:user).permit(:id, :name, :email, :password, :session_token)
  end
end
