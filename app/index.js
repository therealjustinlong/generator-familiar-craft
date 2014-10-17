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
      this.databaseName = props.databaseName;
      this.siteUrl = props.siteUrl;
      this.name = props.name;

      done();
    }.bind(this));
  },

  writing: {
    settings: function () {

      this.template('_package.json', 'package.json');
      this.template('_bower.json', 'bower.json');
      this.template('.bowerrc', '.bowerrc');
      this.template('.gitignore', '.gitignore');
      this.template('editorconfig', '.editorconfig');
      this.template('jshintrc', '.jshintrc');
      this.template('Gruntfile.js', 'Gruntfile.js');

    },

    craftConfig: function () {
      this.dest.mkdir('craft');
      this.dest.mkdir('craft/config');
      this.template('config/db.php', 'craft/config/db.php');
      this.template('config/general.php', 'craft/config/general.php');
      this.template('config/routes.php', 'craft/config/routes.php');

      this.dest.mkdir('craft/config/redactor');
      this.template('config/redactor/Standard.json', 'craft/config/redactor/Standard.json');
      this.template('config/redactor/Simple.json', 'craft/config/redactor/Simple.json');

      this.dest.mkdir('craft/plugins');
      this.dest.mkdir('craft/storage');

      this.dest.mkdir('craft/templates');
      this.template('templates/_layout.html', 'craft/templates/_layout.html');
      this.template('templates/index.html', 'craft/templates/index.html');

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
