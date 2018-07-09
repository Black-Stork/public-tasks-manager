const MongoClient = require('mongodb').MongoClient;

const state = {
    db: null
};

exports.connect = function(url, source, done) {
    if(state.db) {
        return done();
    }

    MongoClient.connect(url, function(err, client) {
        if(err) {
            return done(err);
        }

        state.db = client.db(source);
        done();
    });
};

exports.get = function() {
    return state.db;
}