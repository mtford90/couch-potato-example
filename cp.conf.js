/* globals emit */

var commentByUsername = function (doc) {
    if (doc.type == 'comment') {
        emit(doc.user, doc);
    }
};

var allComments = function (doc) {
    if (doc.type == 'comment') {
        emit(doc._id, doc);
    }
};

var _count = function (keys, values) {
    return values.length;
};

module.exports = {
    databases: {
        db: {
            anonymousReads: false,
            anonymousUpdates: false,
            designDocs: {
                comments: {
                    views: {
                        all: {
                            map: allComments
                        },
                        by_user: {
                            map: commentByUsername
                        },
                        num_comments: {
                            map: commentByUsername,
                            reduce: _count
                        }
                    }
                }
            }
        }
    }
};