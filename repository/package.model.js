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
    status: {
        type: String,
        enum: ['open', 'resolved', 'deleted'],
        default: 'open'
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    closedDate: {
        type: Date,
        default: null
    }
}, {
    collection: 'Package'
});

module.exports = Mongoose.model('Package', Package);