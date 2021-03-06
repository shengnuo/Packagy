'use strict';

const Mongoose = require('mongoose');
const crypto = require('crypto');
const Schema = Mongoose.Schema;

let User = new Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        default: '',
    },
    password: {
        type: String,
        default: ''
    },
    group: {
        type: Schema.ObjectId,
        ref: 'UserGroup'
    },
    salt: {
        type: String
    },
    createdDate: {
        type: Date,
        default: Date.now()
    },
    lastLoginDate: {
        type: Date,
        default: Date.now()
    }
}, {collection: 'User'});

// hash password before insert into the databse
User.pre('save', function (next) {
    if (this.password && this.isModified('password')) {
        this.salt = crypto.randomBytes(16).toString('base64');
        this.password = this.hashPassword(this.password);
    }
    next();
});

User.methods.hashPassword = function (password) {
    if (this.salt && password) {
        return crypto.pbkdf2Sync(password, new Buffer(this.salt, 'base64'), 10000, 64).toString('base64');
    } else {
        return password;
    }
};

// verify method
User.methods.authenticate = function (password) {
    return this.password === this.hashPassword(password);
};

module.exports = Mongoose.model('User', User);