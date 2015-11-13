class ApplicationController < ActionController::Base
  include DeviseTokenAuth::Concerns::SetUserByToken
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :null_session

  before_action :configure_permitted_parameters, if: :devise_controller?

  # Load entire react js app.

  def app
    @location_path = "/#{params[:path]}"
  end

  protected

  # (TODO) Needs API to check logged in and sessions.
  # Possibly should be storing sessions.

  def signed_in?
    true
  end

  def configure_permitted_parameters
    devise_parameter_sanitizer.for(:sign_up).push(:name)
    devise_parameter_sanitizer.for(:account_update).push(:name, :image)
  end

end
