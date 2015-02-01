var assert = require('chai').assert,
    conf = require('../cp.conf'),
    testUtil = require('../../couch-potato/testUtil');


describe('Design documents', function () {
    var docs = conf.databases.db.designDocs;
    describe('comments design doc', function () {
        var views = docs.comments.views;
        describe('all view', function () {
            it('all', function (done) {
                var map = testUtil.wrapMap(views.all.map);
                var doc = {type: 'comment', message: 'yo!', _id: 'xyz'};
                map.once('emit', function (ident, doc) {
                    assert.equal(ident, 'xyz');
                    assert.equal(doc, doc);
                    done();
                });
                map(doc);
            });
        });
    });
});