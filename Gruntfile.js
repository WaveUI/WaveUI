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
      docs: ['docs/*.html', 'docs/css/*.css'],
      bower: 'bower_components',
      npm: 'node_modules'
    },

    jade: {
      docs: {
        options: {
          data: {
            debug: true,
            pretty: true
          }
        },

        files: [{
          cwd: 'docs',
          src: '*.jade',
          dest: 'docs',
          expand: true,
          ext: '.html'
        }]
      }
    },

    htmlmin: {
      docs: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },

        files: [{
          cwd: 'docs',
          src: '*.html',
          dest: 'docs',
          expand: true,
          ext: '.html'
        }]
      }
    },

    sass: {
      options: {
        precision: 6,
        sourcemap: 'auto',
        style: 'expanded',
        trace: true
      },
      dist: {
        files: [{
          cwd: 'src/scss',
          src: '{,*/,*/*/,*/*/*/}*.{scss,sass}',
          dest: 'dist/css',
          expand: true,
          ext: '.css'
        }]
      },
      docs: {
        files: {
          'docs/assets/css/docs.css': 'docs/assets/scss/docs.css.{scss,sass}'
        }
      }
    },

    autoprefixer: {
      options: {
        browsers: ['last 2 versions'],
        map: true
      },
      dist: {
        src: 'dist/css/*.css'
      },
      docs: {
        src: 'docs/assets/css/*.css'
      }
    },

    cssmin: {
      options: {
        sourcemap: true
      },
      dist: {
        files: {
          'dist/css/<%= pkg.name %>.min.css': 'dist/css/<%= pkg.name %>.css'
        }
      },
      docs: {
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

      docs: {
        files: ['docs/{,*/,*/*/,*/*/*/}*.jade', 'docs/{,*/,*/*/,*/*/*/}*.{scss,sass}'],
        tasks: ['jade']
      },

      sass: {
        files: 'src/{,*/,*/*/,*/*/*/}*.{scss,sass}',
        tasks: ['sass:dist', 'autoprefixer', 'cssmin']
      },

      js: {
        files: ['src/{,*/,*/*/,*/*/*/}*.js', '!Gruntfile.js'],
        tasks: ['concat:js', 'uglify']
      }
    }
  });

  grunt.registerTask('docs', ['']);
  grunt.registerTask('default', ['connect:server', 'notify:server', 'watch']);
};