module.exports = function(grunt) {
  grunt.initConfig({
    jasmine: {
      test: {
        src: 'public/js/*.js',
        options: {
          specs: 'spec/javascripts/*.spec.js',
          vendor: ['spec/javascripts/helpers/jquery-1.11.0.min.js', 'spec/javascripts/helpers/jasmine-jquery.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jasmine');

  grunt.registerTask('default', ['jasmine']);
};

