'use strict';

let mongo = require('mongodb');
let MongoClient = mongo.MongoClient;

MongoClient.connect('mongodb://PackagyDev:Packagy@ds115085.mlab.com:15085/packagy', (err, db) => {
    if(err) return;
    // create all collections
    const User = db.collection('User');
    const UserGroup = db.collection('UserGroup');

    // UserGroup
    UserGroup.insert({groupName: 'user'});

    db.close();
});
