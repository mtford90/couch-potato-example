/* globals emit */

module.exports = {
    databases: {
        db: {
            anonymousReads: false,
            anonymousWrites: false,
            designDocs: {
                comments: {
                    views: {
                        all: {
                            map: function (doc) {
                                if (doc.type == 'comment') {
                                    emit(doc._id, doc);
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};
