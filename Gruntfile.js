/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
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
        sourceMap: '<%= uglify.dist.dest %>.map'
      },
      dist: {
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
    },
    'bower-install': {

      target: {

        // Point to the html file that should be updated
        // when you run `grunt bower-install`
        html: 'build/index.html',

        // Optional:

        // If your file paths shouldn't contain a certain
        // portion of a url, it can be excluded
        ignorePath: 'app/',

        // Customize how your stylesheets are included on
        // your page.
        //
        //   default: '<link rel="stylesheet" href="{{filePath}}" />'
        cssPattern: '<link href="{{filePath}}" rel="stylesheet">',

        // Customize how your <script>s are included into
        // your HTML file.
        //
        //   default: '<script src="{{filePath}}"></script>'
        jsPattern: '<script type="text/javascript" src="{{filePath}}"></script>'
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
  grunt.loadNpmTasks('grunt-bower-install');

  // Default task.
  grunt.registerTask('build', [/*'jshint', 'qunit',*/ 'concat', 'uglify', 'copy', 'bower-install']); 
  grunt.registerTask('default', ['build', 'connect']);

};
