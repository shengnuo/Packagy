'use strict';

const LocalStrategy = require('passport-local').Strategy;
const Passport = require('passport');
const Mongoose = require('mongoose');
const UserModel = Mongoose.model('User');

const ERRORCODE = {
    ERROR_UNKNOWN: 1,
    ERROR_INPUT_INVALID: 2,
    ERROR_EMAIL_DUPLICATED: 3,
    ERROR_SIGNIN_FAILURE: 4,
    ERROR_PASSWORD_NOT_EQUAL: 5
};

Passport.use(new LocalStrategy({
    _usernameField: 'email',
    _passwordField: 'password'
    },
    (email, password, cb) => {
        UserModel.findOne({ email: email},
            (err, user) => {
                //TODO implement authenticate
                if (err || !user || !user.authenticate(password)) {
                    return cb(ERRORCODE.ERROR_SIGNIN_FAILURE, false);
                }
            });
    }
));

function validateInput(email, password, passwordRepeat) {
    if(!password || !passwordRepeat || password == 'undefined' || passwordRepeat == 'undefined') {
        return ERRORCODE.ERROR_INPUT_INVALID;
    }
    if (passwordRepeat != password) {
        return ERRORCODE.ERROR_PASSWORD_NOT_EQUAL;
    }
    return 0;
}

exports.saveUser = (email, password, passwordRepeat, groupId, cb) => {
    password = new Buffer(password, 'base64').toString();
    passwordRepeat = new Buffer(passwordRepeat, 'base64').toString();
    let err = validateInput(email, password, passwordRepeat);

    if(!err) {
        let user = new UserModel({
            email: email,
            password: password
        });
        UserModel.save((e, user) => {
            if(e) {
                err = e.code == 11000? ERRORCODE.ERROR_EMAIL_DUPLICATED
                    : ERRORCODE.ERROR_UNKNOWN;
            }
            cb(user, err);
        })
    } else {
        cb(null, err);
    }
};
