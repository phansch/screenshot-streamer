source 'https://rubygems.org'
ruby File.read(".ruby-version").strip.split("-").first
gem 'dotenv-rails', :groups => [:development, :test] # needs to be at top

gem 'sinatra'
gem 'pg'
gem 'unicorn'

group :test, :development do
  gem 'pry-debugger'
end
