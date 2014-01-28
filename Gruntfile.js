/*
 * grunt-splitsuit
 * https://github.com/dshimkoski/grunt-splitsuit
 *
 * Copyright (c) 2014 dshimkoski
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    clean: {
      tests: ['tmp'],
    },

    splitsuit: {
      target: {
        files: {
            'tmp/suit.css': ['test/fixtures/suit.css']
        }
      }
    },

    nodeunit: {
      tests: ['test/*_test.js'],
    },

  });

  grunt.loadTasks('tasks');

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  grunt.registerTask('test', ['clean', 'splitsuit', 'nodeunit']);
  grunt.registerTask('default', ['jshint', 'test']);

};
