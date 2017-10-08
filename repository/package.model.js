'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const Package = new Schema({
    trackingNumber: {
        type: String
    },
    userId: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    createDate: {
        type: Date,
        default: null
    }
}, {
    collection: 'Package'
});

module.exports = Mongoose.model('Package', Package);