screenshot-streamer
===================

**The problem**: My laptop is not powerful enough to actually do video livestreaming.

### The solution:
It is powerful enough to take screenshots every 20 seconds or so.

This app accepts screenshot uploads via an API and shows the last 10 uploaded screenshots.


### Setup the app

    git clone git@github.com:phansch/screenshot-streamer.git && cd screenshot-streamer
    bundle install
    npm install

### Starting the app

    rerun 'rackup'

### Running the tests

    grunt jasmine

### Setting credentials

Before you can post screenshots, you will need to setup the credentials.

Create a `.env` file with the credentials you want:

    USER=a_username
    PASS=a_password

### Posting screenshots

    curl -v -F "data=@sc2.png"  http://localhost:9292/screenshot/whatever.png -u username:password
                      ^                             ^                                     ^
              the file to upload            filename on server              replace with your credentials

