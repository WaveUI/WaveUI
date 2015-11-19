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

    jade: {
      dev: {
        options: {
          data: {
            debug: true,
            pretty: true
          }
        },
        files: [{
          cwd: 'examples',
          src: '*.jade',
          dest: 'examples',
          expand: true,
          ext: '.html'
        }]
      }
    },

    htmlmin: {
      dev: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: [{
          cwd: 'examples',
          src: '*.html',
          dest: 'examples',
          expand: true,
          ext: '.html'
        }]
      }
    },

    sass: {
      dist: {
        options: {
          precision: 6,
          sourcemap: false,
          style: 'expanded',
          trace: false
        },
        files: [{
          cwd: 'src/scss',
          src: '{,*/,*/*/,*/*/*/}*.{scss,sass}',
          dest: 'dist/css',
          expand: true,
          ext: '.css'
        }]
      },

      dev: {
        options: {
          sourcemap: 'auto',
          style: 'expanded',
          trace: true
        },
        files: {
          'examples/style.css': 'examples/style.{scss,sass}'
        }
      }
    },

    cssmin: {
      dist: {
        options: {
          sourcemap: false
        },
        files: {
          'dist/css/<%= pkg.name %>.min.css': 'dist/css/<%= pkg.name %>.css'
        }
      },
      dev: {
        options: {
          sourcemap: true
        },
        files: {
          'docs/assets/css/<%= pkg.name %>.min.css': 'docs/assets/css/<%= pkg.name %>.css'
        }
      }
    },

    concat: {
      js: {
        src: 'src/**/*.js',
        dest: 'dist/js/<%= pkg.name %>.js'
      }
    },

    uglify: {
      dist: {
        files: {
          'dist/js/<%= pkg.name %>.min.js': 'dist/js/<%= pkg.name %>.js'
        }
      }
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
        files: ['**/*.jade'],
        tasks: ['jade:dev']
      },

      sass: {
        files: '**/*.{scss,sass}',
        tasks: ['sass:dev']
      },

      js: {
        files: ['**/*.js', '!Gruntfile.js'],
        tasks: ['concat:js', 'uglify']
      }
    }
  });

  grunt.registerTask('dev', ['jade:dev', 'htmlmin:dev', 'sass:dev']);
  grunt.registerTask('default', ['connect:server', 'dev', 'notify:server', 'watch']);
};