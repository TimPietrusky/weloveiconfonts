/*!
 * http://timpietrusky.com
 * @author Tim Pietrusky
 */

'use strict';

/**
 * Livereload and connect variables
 */
var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({
  port: LIVERELOAD_PORT
});
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

/**
 * Grunt module
 */
module.exports = function (grunt) {

  /**
   * Dynamically load npm tasks
   */
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  /**
   * FireShell Grunt config
   */
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),





    /**
     * Set project info
     */
    project: {
      src: 'src',
      src_js_vendor : '<%= project.src %>/js/vendor',
      app: 'app',
      skin: '<%= project.app %>/skin',
      css: [
        '<%= project.src %>/scss/style.scss'
      ],
      js: [
        '<%= project.src %>/js/vendor/libs.js',
        '<%= project.src %>/js/vendor/ga.js',
        '<%= project.src %>/js/core/*.js',
        '<%= project.src %>/js/*.js'
      ]
    },





    /**
     * Project banner
     * Dynamically appended to CSS/JS files
     * Inherits text from package.json
     */
    tag: {
      banner: '/*!\n' +
              ' * <%= pkg.name %>\n' +
              ' * <%= pkg.title %>\n' +
              ' * <%= pkg.url %>\n' +
              ' * @author <%= pkg.author %>\n' +
              ' * @version <%= pkg.version %>\n' +
              ' * Copyright <%= pkg.copyright %>. <%= pkg.license %> licensed.\n' +
              ' */\n'
    },





    /**
     * Connect port/livereload
     * https://github.com/gruntjs/grunt-contrib-connect
     * Starts a local webserver and injects
     * livereload snippet
     */
    connect: {
      options: {
        port: '9000',
        hostname: '*'
      },
      livereload: {
        options: {
          middleware: function (connect) {
            return [lrSnippet, mountFolder(connect, 'app')];
          }
        }
      }
    },





    /**
     * JSHint
     * https://github.com/gruntjs/grunt-contrib-jshint
     * Manage the options inside .jshintrc file
     */
    jshint: {
      files: ['src/js/*.js'],
      options: {
        jshintrc: '.jshintrc'
      }
    },





    /**
     * Concatenate JavaScript files
     * https://github.com/gruntjs/grunt-contrib-concat
     * Imports all .js files and appends project banner
     */
    concat: {
      options: {
        stripBanners: true,
        nonull: true,
        banner: '<%= tag.banner %>'
      },
      dev: {
        files: {
          '<%= project.skin %>/js/scripts.min.js': '<%= project.js %>'
        }
      }
    },





    /**
     * Uglify (minify) JavaScript files
     * https://github.com/gruntjs/grunt-contrib-uglify
     * Compresses and minifies all JavaScript files into one
     */
    uglify: {
      options: {
        banner: "<%= tag.banner %>"
      },
      dist: {
        files: {
          '<%= project.skin %>/js/scripts.min.js': '<%= project.js %>'
        }
      }
    },





    /**
     * Compile Sass/SCSS files
     * https://github.com/gruntjs/grunt-contrib-sass
     * Compiles all Sass/SCSS files and appends project banner
     */
    compass: {
      dev: {
        options: {
          sassDir: '<%= project.src %>/scss',
          cssDir: '<%= project.skin %>/css',
          watch: true
        }
      },
      dist: {
        options: {
          sassDir: '<%= project.src %>/scss',
          cssDir: '<%= project.skin %>/css',
          outputStyle: 'compressed',
          environment: 'production'
        }
      }
    },





    /**
     * Opens the web server in the browser
     * https://github.com/jsoverson/grunt-open
     */
    open: {
      server: {
        path: 'http://weloveiconfonts.local'
      }
    },





    /**
     * Runs tasks against changed watched files
     * https://github.com/gruntjs/grunt-contrib-watch
     * Watching development files and run concat/compile tasks
     * Livereload the browser once complete
     */
    watch: {
      concat: {
        files: '<%= project.src %>/js/{,*/}*.js',
        tasks: ['concat:dev', 'jshint']
      },
      livereload: {
        options: {
          livereload: LIVERELOAD_PORT
        },
        files: [
          '<%= project.app %>/{,*/}*.html',
          '<%= project.skin %>/css/*.css',
          '<%= project.skin %>/js/{,*/}*.js',
          '<%= project.skin %>/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },





    /* 
     * We use "compass watch" and "watch" at the same time
     */
    concurrent: {
        target1: ['compass', 'watch']
    },





    /*
     * Deploy to a server with FTP
     */
    ftpush: {
      build: {
        auth: {
          host: '185.21.101.189',
          port: 21,
          authKey: 'key1'
        },
        src: 'app',
        dest: '/var/www/weloveiconfonts.com',
        exclusions: ['app/.gitignore']
      }
    },





    /*
     * Deploy to a server with SFTP
     */
    'sftp-deploy': {
      build: {
        auth: {
          host: '185.21.101.189',
          port: 22,
          authKey: 'key1'
        },
        src: 'app',
        dest: '/var/www/weloveiconfonts.com',
        exclusions: ['app/.gitignore'],
        server_sep: '/'
      }
    },
  });





  /**
   * Default task
   * Run `grunt` on the command line
   */
  grunt.registerTask('default', [
    'jshint',
    'connect:livereload',
    'open',
    'concurrent:target1'
  ]);





  /**
   * Build task
   * Run `grunt build` on the command line
   * Then compress all JS/CSS files
   */
  grunt.registerTask('build', [
    'compass:dist',
    'jshint',
    'uglify',
    'sftp-deploy'
  ]);

};
