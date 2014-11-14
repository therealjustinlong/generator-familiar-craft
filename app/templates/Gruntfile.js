 module.exports = function(grunt) {

  var path = require('path');

  grunt.registerTask('watch', [ 'watch' ]);

  grunt.initConfig({

    curl: {
      craft:{
        src: 'http://buildwithcraft.com/latest.zip?accept_license=yes',
        dest: 'craft.zip'
      }
    },

    unzip: {
      craft: {
        src: ['craft.zip'],
        dest: '.tmp/'
      }
    },


    clean: {
      craft:[".tmp", "craft.zip"]
    },

    deployments: {

      options: {
        // any should be defined options here
        "backups_dir": "./backups",
        "target": "stage"
      },

      "local": {
        "title": "Local",
        "database": "<%= databaseName %>",
        "user": "root",
        "pass": "root",
        "host": "localhost"
      },
      "stage": {
        "title": "Stage",
        "database": "<%= databaseName %>",
        "user": "forge",
        "pass": "<%= liveDbPassword %>",
        "host": "<%= liveHost %>",
        "ssh_host": "forge@<%= liveHost %>"

      }
    },

    open : {
      install : {
        path: 'http://<%= siteUrl %>/admin/install',
        app: 'Google Chrome'
      },
    },

    less: {
      development: {
        options:{
          compress:false,
          sourceMap:true,
          sourceMapBasepath:'public',
          sourceMapRootpath:'/',
          sourceMapFilename:'public/styles/styles.map',
          sourceMapURL:'/styles/styles.map'
        },

        files: {
          "public/styles/styles.css": "public/styles/styles.less"
        }

      },
      production: {
        options:{
          compress:true
        },

        files: {
          "public/styles/styles.min.css": "public/styles/styles.less"
        }

      }
    },

    watch: {

      css: {
        files: ['public/styles/*.less'],
        tasks: ['less:development']

      }
    },

    styleinjector: {
          files: {
              src : 'public/styles/*.css',
          },
          options: {
              watchTask: true,
          },
      },
    shell: {

      moveCraft: {

	        command: [
	                'rm -rf craft/app',
	                'mv .tmp/craft/app craft/app'
	            ].join('&&')
      	},
      makeDb: {
        options: {
	        failOnError: false
        },
          command: 'mysql -u root -proot -e "create database <%= databaseName %>"'
      },
      makeStorage: {
        options: {
	        failOnError: false
        },
          command: 'mkdir craft/storage'
      }
    }

  });

  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-curl');
  grunt.loadNpmTasks('grunt-zip');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-deployments');
  grunt.loadNpmTasks('grunt-open');

  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.task.registerTask('craft', ['curl:craft', 'unzip:craft', 'shell:moveCraft', 'clean:craft']);
  grunt.task.registerTask('install', ['craft','shell:makeDb','less:development', 'open:install']);
  grunt.task.registerTask('setup', ['craft','shell:makeDb','less:development', 'db_pull', 'shell:makeStorage']);
  grunt.task.registerTask('db-pull', ['db_pull']);





};
