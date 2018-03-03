# This file is used by Rack-based servers to start the application.
require_relative 'config/environment'
run Rails.application

require 'rack/cors'
use Rack::Cors do
  allow do
    origins 'localhost:3000', /https*:\/\/crdwk\.herokuapp\.com.*/
    resource '*', :headers => :any, :methods => :any
  end
end
