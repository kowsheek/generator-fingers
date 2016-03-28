var Bookshelf = require('../../components/database/bookshelf.js');
var Checkit = require('checkit');

require('./<%= cameledResourceName %>.model.js');

var collection = Bookshelf.Collection.extend({
    model: Bookshelf.model('<%= cameledResourceName %>'),

    fetchForCriteria: function (criteria) {

        if(!('orderby' in criteria) ) {
            criteria['orderby'] = "name";
            criteria['direction'] = "asc";
        }

        return this.query(function (q) {
            for (var param in criteria) {

                if(criteria[param] == null || criteria[param] == undefined || criteria[param] == "")
                    continue;

                else if (param == 'orderby') {
                    q.orderBy(criteria[param], criteria['direction'] || 'desc');
                }
                else if (param == 'direction') {
                    continue;
                }
                else if (param == 'name' || param == 'description') {
                    q.where(param, 'ilike', '%' + criteria[param] + '%');
                }
                else {
                    q.where(param, '=', criteria[param]);
                }
            }
        }).fetch({ withRelated: []});
    }
});

module.exports = Bookshelf.collection('<%= classedResourceName %>s', collection);