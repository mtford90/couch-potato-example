/* globals emit */

/**
 * Declarative CouchDB configuration.
 *
 * Used by the command line tools to configure CouchDB appropriately.
 */

module.exports = {
    databases: {
        db: {
            anonymousReads: false,
            anonymousWrites: false,
            designDocs: {
                example: {
                    views: {
                        foo: {
                            map: function (doc) {
                                emit(doc._id, doc._rev)
                            }
                        }
                    }
                }
            }
        }
    }
};