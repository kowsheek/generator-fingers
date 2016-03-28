'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var lodash = require('lodash');

module.exports = yeoman.Base.extend({

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the bee\'s knees ' + chalk.red('generator-fingers') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'resourceName',
      message: 'What is the name of this resource?',
      defaults: 'sample'
      //todo: filter input to all lower cases with _ split for words
    }];

    this.prompt(prompts, function (props) {
      // To access props later use this.props.resourceName;
      this.props = props;

      done();
    }.bind(this));
  },

  writing: function () {
    var resourceNames = {
      resourceName: this.props.resourceName,
      cameledResourceName: lodash.camelCase(this.props.resourceName),
      classedResourceName: lodash.upperFirst(lodash.camelCase(this.props.resourceName))
    };

    this.fs.copyTpl(
      this.templatePath('resource.model.js'),
      this.destinationPath(resourceNames.cameledResourceName + '.model.js'),
      resourceNames
    );
    
    this.fs.copyTpl(
      this.templatePath('resource.collection.js'),
      this.destinationPath(resourceNames.cameledResourceName + '.collection.js'),
      resourceNames
    );
  }
});