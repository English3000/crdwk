class Api::SessionsController < ApplicationController
  def destroy
    sign_out
    render json: {}
  end

  def create
    @user = User.find_by_credentials(params[:user][:email], params[:user][:password])
    if @user
      sign_in(@user)
      render partial: 'user', locals: {user: @user}
    else
      render json: ['Invalid credentials: user not found'], status: 404
    end
  end

  def search
    @users = User.where("LOWER(users.name) LIKE ?", '%' + params['query'].downcase + '%')
    @ideas = Idea.where("LOWER(ideas.name) LIKE ?", '%' + params['query'].downcase + '%')
    render partial: 'api/sessions/index', locals: {users: @users, ideas: @ideas}
  end
end
