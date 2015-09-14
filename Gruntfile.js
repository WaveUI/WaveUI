module.exports = function (grunt) {
  'use strict';

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    connect: {
      server: {
        options: {
          port: 3000,
          base: '.',
        }
      }
    },

    clean: {
      dist: 'dist',
      docs: 'docs',
      bower: 'bower_components',
      npm: 'node_modules'
    },

    jade: {
      dist: {
        options: {
          data: {
            debug: true,
            pretty: true
          }
        },
        files: [{
          cwd: 'libs',
          src: '**/*.jade',
          dest: 'dist/components',
          expand: true,
          ext: '.html'
        }]
      }
    },

    wiredep: {
      options: {
        dependencies: true,
        devDependencies: true,
        'overrides': {
          'font-awesome': {
            'main': [
              'less/font-awesome.less',
              'scss/font-awesome.scss',
              'css/font-awesome.css'
            ]
          }
        }
      },
      dist: {}
    },

    sass: {
      dist: {
        options: {
          precision: 6,
          sourcemap: 'auto',
          style: 'expanded',
          trace: true
        },

        files: [{
          cwd: 'libs',
          src: '**/*.{scss,sass}',
          dest: 'dist/components',
          expand: true,
          ext: '.css'
        }]
      }
    },

    autoprefixer: {
      options: {
        browsers: ['last 2 versions'],
        map: true
      },
      dist: {
        src: 'dist/components/**/*.css'
      }
    },

    concat: {
      js: {
        src: 'dist/components/**/*.js',
        dest: 'dist/js/<%= pkg.name %>.js'
      },
      css: {
        src: 'dist/components/**/*.css',
        dest: 'dist/css/<%= pkg.name %>.css'
      }
    },

    cssmin: {
      options: {
        sourcemap: true
      },

      dist: {
        files: [{
          expand: true,
          cwd: 'dist/css',
          src: ['*.css', '!*.min.css'],
          dest: 'dist/css',
          ext: '.min.css'
        }]
      },
    },

    notify: {
      options: {
        title: 'Grunt'
      },

      server: {
        options: {
          message: 'Grunt has been activated.'
        }
      },

      grunt: {
        options: {
          message: 'Grunt has been updated.'
        }
      },

      jade: {
        options: {
          message: 'Jade files has been compiled.'
        }
      },

      sass: {
        options: {
          message: 'Sass files has been compiled.'
        }
      }
    },

    watch: {
      options: {
        livereload: true,
        dateFormat: function (time) {
          grunt.log.writeln('Grunt has finished in ' + time + 'ms!');
          grunt.log.writeln('Waiting...');
        },
        event: ['all']
      },

      configFiles: {
        files: ['Gruntfile.js'],
        tasks: ['notify:grunt'],
        options: {
          reload: true
        }
      },

      jade: {
        files: '{,*/,*/*/,*/*/*/}*.jade',
        tasks: ['jade']
      },

      sass: {
        files: '{,*/,*/*/,*/*/*/}*.{scss,sass}',
        tasks: ['sass', 'autoprefixer', 'concat:css', 'cssmin']
      }
    }
  });

  grunt.registerTask('default', ['connect:server', 'notify:server', 'watch']);
};