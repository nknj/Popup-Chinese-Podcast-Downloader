module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    shell: {
      scrape: {
        command: 'casperjs src/getIds.js'
      }
    }
  });

  grunt.registerTask('default', [
    'shell:scrape'
  ]);

};
