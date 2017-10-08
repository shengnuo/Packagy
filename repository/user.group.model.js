'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const UserGroup = new Schema({
    groupName: {
        type: String
    }
});

module.exports = Mongoose.model('UserGroup', UserGroup);