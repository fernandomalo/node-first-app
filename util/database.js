const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = callback => {
    MongoClient.connect('mongodb+srv://fernando:fernando.29@sandbox.sjuqetg.mongodb.net/shop?retryWrites=true&w=majority&appName=Sandbox')
    .then(client => {
        console.log('connected!');
        _db = client.db();
        callback(client);
    })
    .catch(err => {
        console.log(err);
        throw 'No database found';
    })
}

const getDb = () => {
    if (_db) {
        return _db;
    }
    throw 'No database connection';
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;