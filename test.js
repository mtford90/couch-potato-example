var potato = require('../couch-potato/potato');
var couchdb = potato.couchdb();

function createComment(message, cb) {
    couchdb.upsertDocument({message: message, type: 'comment'}, cb);
}

couchdb.createUser({
    username: 'mike',
    password: 'mike',
    auth: couchdb.AUTH_METHOD.BASIC
}, function (err) {
    if (!err) {
        createComment('Yo!', function (err) {
            if (err) console.error('error creating comment', err);
            else {
                console.log('All good!');
            }
        });
    }
    else {
        console.error('Error logging in', err);
    }
});





