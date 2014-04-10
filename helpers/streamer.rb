module StreamerUtils
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
