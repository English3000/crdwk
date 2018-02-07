class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def home
  end

  helper_method :current_user, :signed_in? #other controllers can use these

  def current_user
    # If there is no session token, there is no user session, meaning nobody is signed in.
    return nil unless session[:session_token]
    @current_user = User.find_by(session_token: session[:session_token])
  end

  def signed_in?
    !!current_user
  end

  def sign_in(user)
    current_user = user
    session[:session_token] = current_user.reset_token
  end

  def sign_out
    current_user.reset_token
    session[:session_token] = nil
  end
end
