/*global module:false*/
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
    uglify: {
      options: {
        banner: '<%= banner %>',
        sourceMap: 'build/js/<%= pkg.name %>.map.js',
        sourceMappingURL: '<%= uglify.options.sourceMap.replace("build/", "/") %>',
        sourceMapRoot: '/',
        sourceMapPrefix: 1
      },
      app: {
        src: '<%= concat.dist.dest %>',
        dest: '<%= concat.dist.dest.replace(/\.js$/, ".min.js") %>'
      }
    },
    copy: {
      main: {
        expand: true,
        cwd: 'src/',
        src: ['**/*.html', 'lib/**/*.js'],
        dest: 'build/',
      },
      lib_js: {
        expand: true,
        cwd: 'lib/js',
        src: '**/*',
        dest: 'build/js/lib/app'
      },
      list_css: {
        expand: true,
        cwd: 'lib/css',
        src: '**/*',
        dest: 'build/css/lib/app'
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
          jQuery: true
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
    connect: {
      server: {
        options: {
          port: 9001,
          base: 'build',
          keepalive: true
        }
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
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-bower-task');

  // Default task.
  grunt.registerTask('build', [/*'jshint', 'qunit',*/ 'concat', 'bower', 'copy', 'uglify']); 
  grunt.registerTask('server', ['build', 'connect']);

  grunt.registerTask('default', ['build'])

};
