'use strict';

var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  // The name `constructor` is important here
  initializing: function () {
    this.pkg = require('../package.json');
  },
  prompting: function () {
    var done = this.async();


    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the fabulous ' + chalk.red('Familiar Craft CMS') + ' generator!'
    ));

    var prompts = [{

      name: 'name',
      message: 'Whats the name of this project?',
      default: this.appname
    },{

      name: 'siteUrl',
      message: 'Whats the local url of this project?',
      default: this.appname+'.dev'
    },{

      name: 'databaseName',
      message: 'Whats the database name?',
      default: this.appname+'_craft'
    }
    ];

    this.prompt(prompts, function (props) {
      this.someOption = props.someOption;

      done();
    }.bind(this));
  },

  writing: {
    settings: function () {

      this.src.copy('_package.json', 'package.json');
      this.src.copy('_bower.json', 'bower.json');
      this.src.copy('.bowerrc', '.bowerrc');
      this.src.copy('editorconfig', '.editorconfig');
      this.src.copy('jshintrc', '.jshintrc');
      this.src.copy('Gruntfile.js', 'Gruntfile.js');

    },

    craftConfig: function () {
      this.dest.mkdir('craft');

      this.dest.mkdir('craft/config');
      this.src.copy('config/db.php', 'craft/config/db.php');
      this.src.copy('config/general.php', 'craft/config/general.php');
      this.src.copy('config/routes.php', 'craft/config/routes.php');

      this.dest.mkdir('craft/config/redactor');
      this.src.copy('config/redactor/Standard.json', 'craft/config/redactor/Standard.json');
      this.src.copy('config/redactor/Simple.json', 'craft/config/redactor/Simple.json');

      this.dest.mkdir('craft/plugins');
      this.dest.mkdir('craft/storage');

      this.dest.mkdir('craft/templates');
      this.src.copy('templates/_layout.html', 'craft/templates/_layout.html');
      this.src.copy('templates/index.html', 'craft/templates/index.html');

    },

    projectFiles: function () {

      this.dest.mkdir('public');
      this.dest.mkdir('public/styles');
      this.dest.mkdir('public/scripts');
      this.src.copy('public/styles/styles.less', 'public/styles/styles.less');
      this.src.copy('public/index.php', 'public/index.php');
      this.src.copy('public/.htaccess', 'public/.htaccess');
      this.src.copy('public/robots.txt', 'public/robots.txt');

    }
  },

  end: function () {
    this.installDependencies({
      skipInstall: this.options['skip-install'],
      callback: function () {
        this.spawnCommand('grunt', ['craft-install']);
      }.bind(this)
    });
  }
});
