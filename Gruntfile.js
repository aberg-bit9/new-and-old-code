module.exports = function(grunt) {

  grunt.initConfig({
    connect: {
      server: {
        options: {
          port: 8888,
          base: 'src',
          middleware: function (connect, options, middlewares) {
            middlewares.unshift(require('grunt-connect-proxy/lib/utils').proxyRequest);
            return middlewares;
          }
        },
        proxies: [
          {
            context: '/v2',
            host: 'localhost',
            port: 8080,
            rewrite: {
              '^/v2': ''
            }
          }
        ]
      }
    },
    watch: {
      workingFiles: {
        files: [ 'src/index.html', 'src/**/*.css', 'src/**/*.js' ]
      }
    },
    useminPrepare: {
      html: 'src/index.html',
      options: {
        dest: 'build'
      }
    },
    usemin: {
      html: 'build/index.html'
    },
    shell: {
      webpack: {
        command: './v2/node_modules/.bin/webpack --config ./v2/webpack.config.js --context ./v2 --output-path ./v2/build -p'
      }
    },
    copy: {
      v2: {
        expand: true,
        src: 'v2/build/*',
        dest: 'build/v2/',
        flatten: true,
        filter: 'isFile',
      },
    }
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-connect-proxy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', [
    'configureProxies:server', 
    'connect:server', 
    'watch'
  ]);

  grunt.registerTask('build', [
    'useminPrepare',
    'concat:generated',
    'cssmin:generated',
    'uglify:generated',
    'usemin',
    'shell:webpack',
    'copy:v2'
  ]);

}