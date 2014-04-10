require 'sinatra'
require 'dotenv'
Dotenv.load

helpers do
  def protected!
    return if authorized?
    headers['WWW-Authenticate'] = 'Basic realm="Restricted Area"'
    halt 401, "Not authorized\n"
  end

  def authorized?
    @auth ||=  Rack::Auth::Basic::Request.new(request.env)
    @auth.provided? and @auth.basic? and @auth.credentials and @auth.credentials == [ENV['LOGIN'], ENV['PASS']]
  end
end

get '/' do
  "Everybody can see this page"
end

get '/screenshot' do
  protected!
  "Welcome, authenticated client"
end
