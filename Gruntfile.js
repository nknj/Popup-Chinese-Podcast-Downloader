module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    shell: {
      options: {
        stderr: true
      },
      getIds: {
        command: 'casperjs src/getIds/scrape.js'
      },
      download: {
        command: 'python src/download/scrape.py'
      }
    }
  });

  grunt.registerTask('default', [
    'shell:getIds',
    'shell:download'
  ]);

};
