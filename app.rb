require 'sinatra'
require 'dotenv'
Dotenv.load

# require stuff from stdlib
require 'fileutils'

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

post '/screenshot/:filename' do
  protected!
  dir = File.join("files", "screenshots")
  FileUtils.mkdir_p(userdir)
  filename = File.join(dir, params[:filename])
  datafile = params[:data]
  File.open(filename, 'wb') do |file|
    file.write(datafile[:tempfile].read)
  end
  "wrote to #{filename}\n"
end
