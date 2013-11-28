/*global module:false*/
/*global require:false*/
module.exports = function(grunt) {

  var path = require('path');

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> */\n',
    // Task configuration.
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: ['src/js/<%= pkg.name %>.js', 'src/js/<%= pkg.name %>/**/*.js'],
        dest: 'build/js/<%= pkg.name %>.js'
      }
    },
    cssmin: {
      combine: {
        files: {
          'build/css/pcur.min.css': ['src/css/**/*.css']
        }
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>',
        sourceMap: '<%= uglify.app.dest %>.map',
        sourceMappingURL: '<%= uglify.options.sourceMap.replace("build/", "/") %>',
        sourceMapRoot: '/',
        sourceMapPrefix: 1
      },
      app: {
        src: '<%= concat.dist.dest %>',
        dest: '<%= concat.dist.dest.replace(/.js$/, ".min.js") %>'
      }
    },
    copy: {
      main: {
        expand: true,
        cwd: 'src/',
        src: ['**/*.html', 'lib/**/*.js', 'favicon.ico', 'config.json'],
        dest: 'build/',
      },
      lib_js: {
        expand: true,
        cwd: 'lib/js',
        src: '**/*',
        dest: 'build/js/lib'
      },
      list_css: {
        expand: true,
        cwd: 'lib/css',
        src: '**/*',
        dest: 'build/css/lib'
      }
    },
    bower: {
      options: {
        targetDir: 'build/',
        verbose: true,
        layout: function(type, component) { return path.join(type, 'lib', component); }
      },
      install: {
      }
    },
    jshint: {
      options: {
        expr: true,
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {
          jQuery: false,
          $: false,
          angular: false
        }
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib_test: {
        src: ['src/js/**/*.js', 'test/js/**/*.js']
      }
    },
    qunit: {
      files: ['test/**/*.html']
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib_test: {
        files: '<%= jshint.lib_test.src %>',
        tasks: ['jshint:lib_test', 'qunit']
      }
    },
    shell: {
      fakeapi: {
        options: {
          stdout: true
        },
        command: 'node fakeapi/fakeapi.js'
      },
      server: {
        options: {
          stdout: true
        },
        command: 'node server/server.js'
      }
    },
    clean: ['build']
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect'); //XXX to remove
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-shell');

  // Default task.
  grunt.registerTask('build', ['jshint', /*'qunit',*/ 'concat', 'bower', 'copy', 'cssmin', 'uglify']); 
  
  grunt.registerTask('server', ['shell:server']);
  grunt.registerTask('fakeapi', ['shell:fakeapi']);

  grunt.registerTask('default', ['build']);

};
