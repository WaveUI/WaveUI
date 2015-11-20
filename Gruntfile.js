module.exports = function (grunt) {
  'use strict';

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Connect
    connect: {
      server: {
        options: {
          port: 3000,
          base: '.',
        }
      }
    },

    // Jade
    jade: {
      dev: {
        options: {
          data: {
            debug: true,
            pretty: true
          }
        },
        files: {
          'examples/index.html': 'examples/index.jade'
        }
      }
    },

    // Wiredep
    wiredep: {
      dev: {
        options: {
          dependencies: true,
          devDependencies: true,
          'overrides': {
            'waypoints': {
              'main': [
                "lib/jquery.waypoints.min.js"
              ]
            },
            'font-awesome': {
              'main': [
                'less/font-awesome.less',
                'scss/font-awesome.scss',
                'css/font-awesome.css'
              ]
            }
          }
        },
        src: [
          '**/*.jade'
        ],
      }
    },

    // HTMLmin
    htmlmin: {
      dev: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          'examples/index.html': 'examples/index.html'
        }
      }
    },

    // Sass
    sass: {
      options: {
        precision: 6,
        style: 'expanded'
      },

      dist: {
        options: {
          sourcemap: false,
          trace: false
        },
        files: {
          'dist/css/wave.css': 'src/scss/wave.{scss,sass}'
        }
      },

      dev: {
        options: {
          sourcemap: 'auto',
          trace: true
        },
        files: {
          'dist/css/wave.css': 'src/scss/wave.{scss,sass}',
          'examples/style.css': 'examples/style.{scss,sass}'
        }
      }
    },

    // CSSmin
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

    // Concat
    concat: {
      js: {
        src: 'src/**/*.js',
        dest: 'dist/js/<%= pkg.name %>.js'
      }
    },

    // Uglify
    uglify: {
      dist: {
        files: {
          'dist/js/<%= pkg.name %>.min.js': 'dist/js/<%= pkg.name %>.js'
        }
      }
    },

    // Notify
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

    // Watch
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
        tasks: ['jade:dev', 'wiredep:dev']
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