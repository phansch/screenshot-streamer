require 'sinatra'
require 'dotenv'
Dotenv.load

# require stuff from stdlib
require 'fileutils'
require 'json'

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

  def timestamp
    Time.now.strftime("%H:%M:%S")
  end

  def images
    Dir["public/screenshots/*"].sort_by do
      |filename| File.mtime(filename)
    end
      .reverse
      .map do |image|
      image[/screenshots\/\w*.((png)|(jpg))/]
    end
  end

  def write_file(filename)
    dir = File.join("public", "screenshots")
    FileUtils.mkdir_p(dir)
    filename = File.join(dir, params[:filename])
    datafile = params[:data]
    File.open(filename, 'wb') do |file|
      file.write(datafile[:tempfile].read)
    end
  end

  def first_last(index)
    return ' class="last"' if index == images.count - 1
    return ' class="first"' if index == 1
  end
end

connections = []

get '/' do
  @images = images
  erb :index
end

post '/screenshot/:filename' do
  protected!
  write_file(params[:filename])

  notification = params.merge( {'timestamp' => timestamp}).to_json

  connections.each { |out| out << "data: #{notification}\n\n"}
  "wrote to #{params[:filename]}\n"
end

get '/connect', provides: 'text/event-stream' do
  stream :keep_open do |out|
    connections << out
    out.callback { connections.delete(out) }
  end
end

