'use strict';

var Bookshelf = require('../../components/database/bookshelf.js');
var Checkit = require('checkit');

var validationRules = {};

var model = Bookshelf.Model.extend({
    tableName: "<%= cameledResourceName %>",

    hasTimestamps: true,
    
    validate: function () {
        return Checkit(validationRules).run(this.attributes);
    },

    initialize: function () {
        this.on('saving', this.validate);
    }
});

module.exports = Bookshelf.model('<%= classedResourceName %>', model);