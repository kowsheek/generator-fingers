'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-fingers:resource_api', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/resource_api'))
      .withPrompts({ resourceName: 'sample resource' })
      .on('end', done);
  });

  it('creates files', function (done) {
    assert.file([
      'sampleResource.model.js',
      'sampleResource.collection.js'
    ]);
    
    done();
  });
});