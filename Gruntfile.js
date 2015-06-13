'use strict';

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-webpack');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.initConfig({

    jshint: {
      dev: {
        src: ['Gruntfile.js', 'server.js', 'tests/*.js', 'models/*.js', 'routes/*.js', 'app/**/**/*.jsx', 'build.js']
      },
      options: {
        jshintrc: true
      }
    },

    webpack: {
      client: {
        entry: __dirname + '/app/js/client.jsx',
        output: {
          path: 'build/',
          file: 'bundle.js'
        },
        module: {
          loaders: [{ test: /\.jsx$/, loader: 'jsx-loader' }]
        }
      },
      test: {
        entry: __dirname + '/test/client/test.js',
        output: {
          path: 'test/client/',
          file: 'test_bundle.js'
        }
      }
    },

    copy: {
      html: {
        cwd: 'app/',
        expand: true,
        flatten: false,
        src: '**/*.html',
        dest: 'build/',
        filter: 'isFile'
      }
    },

    clean: {
      dev: {
        src: 'build/'
      }
    },

    watch: {
      app: {
        files: ['.app/**/*.html'],
        tasks: ['webpack:client', 'copy:html'],
        options: {
          liveload: true
        }
      }
    }
  });

  grunt.registerTask('build:dev', ['webpack:client', 'copy:html']);
  grunt.registerTask('lint', ['jshint:dev']);
  grunt.registerTask('default', ['build:dev']);
};
