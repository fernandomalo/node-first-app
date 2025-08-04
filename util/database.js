const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const mongoConnect = callback => {
    MongoClient.connect('mongodb+srv://fernando:fernando.29@sandbox.sjuqetg.mongodb.net/?retryWrites=true&w=majority&appName=Sandbox')
    .then(client => {
        console.log('connected!');
        callback(client);
    })
    .catch(err => console.log(err))
}

module.exports = mongoConnect;