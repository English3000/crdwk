class Api::SessionsController < ApplicationController
  def destroy
    sign_out
    render json: {}
  end

  def create
    @user = User.find_by_credentials(params[:user][:email], params[:user][:password])
    if @user
      sign_in(@user)
      render partial: 'api/users/show', locals: {user: @user, current: true}
    else
      render json: ['Invalid credentials: user not found'], status: 422
    end
  end

  def search
    @users = User.where("LOWER(users.name) LIKE ?", '%' + params['query'].downcase + '%')
    @ideas = Idea.where("LOWER(ideas.name) LIKE ?", '%' + params['query'].downcase + '%')
  end
end
