class Api::SessionsController < ApplicationController
  def destroy
    sign_out
    render json: {}
  end

  def create
    @user = User.find_by_credentials(params[:user][:email], params[:user][:password])
    if @user
      sign_in(@user)
      render json: {id: @user.id, email: @user.email}
    else
      render json: ['Invalid credentials: user not found'], status: 422
    end
  end
end
