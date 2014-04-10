require 'sinatra'
require 'dotenv'
Dotenv.load

# require stuff from stdlib
require 'fileutils'
require 'json'

# require helpers
Dir["./helpers/*.rb"].each {|file| require_relative file }

helpers AuthUtils, StreamerUtils

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

