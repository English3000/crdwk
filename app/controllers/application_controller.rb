class ApplicationController < ActionController::Base
  protect_from_forgery #with: :exception
  #commenting out------^ allows signing in for mobile but not signing out
  # gives same error w/ sign out, but first need to fix mobile's Redux cycle
  helper_method :current_user, :signed_in?

  def home
    if signed_in?
      @user = current_user
      render :show
    end
  end

  def current_user
    return nil unless session[:session_token]
    @current_user ||= User.find_by(session_token: session[:session_token])
  end

  def signed_in?
    !!current_user
  end

  def sign_in(user)
    current_user = user
    session[:session_token] = current_user.reset_token
  end

  def sign_out
    current_user.reset_token if current_user #cond'l = workaround
    session[:session_token] = nil
  end
end
