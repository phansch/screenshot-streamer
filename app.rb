require 'json'
require 'sinatra'
require 'dotenv'
Dotenv.load

# require stuff from stdlib
require 'fileutils'


set :server, %w[thin]

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

def timestamp
  Time.now.strftime("%H:%M:%S")
end
connections = []
notifications = []

get '/' do
  @images = Dir["public/screenshots/*"].sort_by! {|filename| File.mtime(filename) }.map! do |image|
    image[/screenshots\/\w*.((png)|(jpg))/]
  end
  erb :index
end

post '/screenshot/:filename' do
  protected!
  dir = File.join("public", "screenshots")
  FileUtils.mkdir_p(dir)
  filename = File.join(dir, params[:filename])
  datafile = params[:data]
  File.open(filename, 'wb') do |file|
    file.write(datafile[:tempfile].read)
  end
  notification = params.merge( {'timestamp' => timestamp}).to_json

  notifications << notification

  notifications.shift if notifications.length > 10
  connections.each { |out| out << "data: #{notification}\n\n"}
  "wrote to #{filename}\n"
end

get '/connect', provides: 'text/event-stream' do
  stream :keep_open do |out|
    connections << out

    #out.callback on stream close evt. 
    out.callback {
      #delete the connection 
      connections.delete(out)
    }
  end
end

