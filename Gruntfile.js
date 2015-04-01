/*!
 * Flat UI's Gruntfile
 * http://designmodo.com/flat-free/
 * Copyright 2013-2014 Designmodo, Inc.
 */

module.exports = function (grunt) {
  'use strict';

  // Force use of Unix newlines
  grunt.util.linefeed = '\n';

  grunt.initConfig({

    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    bower_conf: grunt.file.exists('.bowerrc') ? grunt.file.readJSON('.bowerrc') : { directory : 'bower_components' },
    banner: '/*!\n' +
            ' * Flat UI Free v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
            ' * Copyright 2013-<%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
            ' */\n',


    clean: {
      dist: ['dist']
    },

    jshint: {
      options: {
        jshintrc: 'js/.jshintrc'
      },
      src: {
        src: 'js/*.js'
      },
      assets: {
        src: 'docs/assets/js/application.js'
      }
    },

    jscs: {
      options: {
        config: 'js/.jscs.json'
      },
      grunt: {
        options: {
          requireCamelCaseOrUpperCaseIdentifiers: null
        },
        src: 'Gruntfile.js'
      },
      src: {
        src: '<%= jshint.src.src %>'
      },
      assets: {
        options: {
          requireCamelCaseOrUpperCaseIdentifiers: null
        },
        src: 'docs/assets/js/application.js'
      }
    },

    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: false
      },
      dist: {
        src: [
          '<%= bower_conf.directory %>/jquery-ui/ui/jquery.ui.core.js',
          '<%= bower_conf.directory %>/jquery-ui/ui/jquery.ui.widget.js',
          '<%= bower_conf.directory %>/jquery-ui/ui/jquery.ui.mouse.js',
          '<%= bower_conf.directory %>/jquery-ui/ui/jquery.ui.position.js',
          '<%= bower_conf.directory %>/jquery-ui/ui/jquery.ui.button.js',
          '<%= bower_conf.directory %>/jquery-ui/ui/jquery.ui.slider.js',
          '<%= bower_conf.directory %>/jquery-ui/ui/jquery.ui.effect.js',
          '<%= bower_conf.directory %>/jquery-ui-touch-punch/jquery.ui.touch-punch.js',

          '<%= bower_conf.directory %>/bootstrap/dist/js/bootstrap.js',

          '<%= bower_conf.directory %>/bootstrap-switch/dist/js/bootstrap-switch.js',
          '<%= bower_conf.directory %>/bootstrap-tagsinput/dist/bootstrap-tagsinput.js',
          '<%= bower_conf.directory %>/holderjs/holder.js',
          '<%= bower_conf.directory %>/typeahead.js/dist/typeahead.bundle.js',
          '<%= bower_conf.directory %>/select2/select2.js',

          'js/*.js',
          '!js/application.js'
        ],
        dest: 'dist/assets/js/<%= pkg.name %>.js'
      }
    },

    uglify: {
      options: {
        preserveComments: 'some'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/assets/js/<%= pkg.name %>.min.js'
      }
    },

    less: {
      compileCore: {
        options: {
          strictMath: true,
          sourceMap: true,
          outputSourceFiles: true,
          sourceMapURL: '<%= pkg.name %>.css.map',
          sourceMapFilename: 'dist/assets/css/<%= pkg.name %>.css.map'
        },
        files: {
          'dist/assets/css/<%= pkg.name %>.css': 'less/<%= pkg.name %>.less'
        }
      }
    },

    autoprefixer: {
      options: {
        browsers: [
          'Android >= 4',
          'Chrome >= 20',
          'Firefox >= 24', // Firefox 24 is the latest ESR
          'Explorer >= 9',
          'iOS >= 6',
          'Opera >= 16',
          'Safari >= 6'
        ]
      },
      core: {
        options: {
          map: true
        },
        src: 'dist/assets/css/<%= pkg.name %>.css'
      },
      // assets: {
      //   src: ['docs/assets/css/docs.css', 'docs/assets/css/demo.css']
      // }
    },

    csslint: {
      options: {
        csslintrc: 'less/.csslintrc',
        'overqualified-elements': false
      },
      src: [
        'dist/css/<%= pkg.name %>.css'
      ],
      assets: {
        options: {
          ids: false,
          'overqualified-elements': false
        },
        src: ['docs/assets/css/docs.css', 'docs/assets/css/demo.css']
      }
    },

    cssmin: {
      options: {
        keepSpecialComments: '*',
        noAdvanced: true
      },
      core: {
        files: {
          'dist/assets/css/<%= pkg.name %>.min.css': 'dist/assets/css/<%= pkg.name %>.css'
        }
      }
    },

    usebanner: {
      dist: {
        options: {
          position: 'top',
          banner: '<%= banner %>'
        },
        files: {
          src: [
            'dist/assets/css/<%= pkg.name %>.css',
            'dist/assets/css/<%= pkg.name %>.min.css',
            'docs/assets/css/docs.css',
            'docs/assets/css/demo.css'
          ]
        }
      }
    },

    csscomb: {
      options: {
        config: 'less/.csscomb.json'
      },
      dist: {
        files: {
          'dist/assets/css/<%= pkg.name %>.css': 'dist/assets/css/<%= pkg.name %>.css'
        }
      },
      assets: {
        files: {
          'docs/assets/css/docs.css': 'docs/assets/css/docs.css',
          'docs/assets/css/demo.css': 'docs/assets/css/demo.css'
        }
      }
    },

    copy: {
      dist: {
        expand: true,
        src: [
          'fonts/**',
          'img/**'
        ],
        dest: 'dist/assets'
      },
      distTemplate: {
        src: 'docs/template.html',
        dest: 'dist/index.html'
      },
      distVendorJS: {
        expand: true,
        flatten: true,
        cwd: './bower_components',
        src: [
          'jquery/dist/jquery.min.js',
          'jquery/dist/jquery.min.map',
          'respond/dest/respond.min.js',
          'html5shiv/dist/html5shiv.js',
          'videojs/dist/video-js/video.js',
          'videojs/dist/video-js/video-js.swf'
        ],
        dest: 'dist/assets/js/vendor/'
      },
      distVendorCSS: {
        expand: true,
        flatten: true,
        cwd: '<%= bower_conf.directory %>',
        src: [
          'bootstrap/dist/css/bootstrap.min.css'
        ],
        dest: 'dist/assets/css/vendor/'
      },
      docsVendorJS: {
        expand: true,
        flatten: true,
        cwd: '<%= bower_conf.directory %>',
        src: 'google-code-prettify/src/prettify.js',
        dest: 'docs/assets/js/'
      }
    },

    // Assemble Task configuration.
    assemble: {
      options: {
        layout: 'index.hbs',
        layoutdir: 'templates/layouts/',
        partials: 'templates/partials/**/*.hbs'
      },
      pages: {
        options: {
          flatten: true
        },
        // look for pages in pages directory + place them in dist directory
        files: {
          'dist/': ['templates/pages/*.hbs']
        }

      }

    },

    connect: {
      options: {
        port: 9007,
        livereload: 42201,
        hostname: 'localhost',
        base: 'dist/'
      },
      livereload: {
        options: {
          open: true
        }
      }
    },

    watch: {
      less: {
        files: 'less/**/*.less',
        tasks: ['less', 'autoprefixer']
      },
      templates: {
        files: 'templates/**/*.hbs',
        tasks: ['assemble']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: ['{,*/}*.html', '{docs,dist}/**/css/{,*/}*.css', '{docs,dist}/**/js/{,*/}*.js']
      }
    }
  });

  // These plugins provide necessary tasks.
  require('load-grunt-tasks')(grunt, { pattern: ['grunt-*', 'assemble']});
  require('time-grunt')(grunt);

  // Test task.
  grunt.registerTask('test', ['csslint', 'jshint', 'jscs']);

  // JS prep-distribution task.
  grunt.registerTask('dist-js', ['concat', 'uglify']);

  // CSS prep-distribution task.
  grunt.registerTask('dist-css', ['less', 'autoprefixer', 'usebanner', 'csscomb', 'cssmin']);

  // Docs distribution task. To be removed
  // grunt.registerTask('dist-docs', ['copy:docsVendorJS']);

  // HTML prep-distribution task goes here (assemble), extra task
  grunt.registerTask('dist-assemble', ['assemble']);

  // Copy files to dist.
  grunt.registerTask('dist-copy', ['copy:dist', 'copy:distVendorJS', 'copy:distVendorCSS', 'assemble:pages']);

  // Full distribution task.
  grunt.registerTask('dist', ['clean', 'dist-css', 'dist-copy', 'dist-js']);

  // Default task.
  grunt.registerTask('default', ['test', 'dist']);

  // Run server, run...
  grunt.registerTask('server', ['less', 'autoprefixer', 'connect:livereload', 'watch']);

};
