'use strict';

const userService = require('../service/user.service');

exports.signup = (req, res) => {
    userService.saveUser(
        req.body.email,
        req.body.password,
        req.body.passwordRepeat,
        req.body.group,
        (user, err) => {
            if(err) {
                //TODO add better messages
                return res.status(400).send({errorMsg: 'error'});
            }
            req.session.regenerate(() => {
                req.session.userId = user._id;
                res.status(200).send();
            });
        });
};

exports.login = (req, res, cb) => {
    userService.login(req,res, cb);
};

exports.logout = (req, res, cb) => {
    req.session.regenerate(() => {
        req.session.userId = '';
    });
};

exports.getAllUserGroups = (req, res) => {
    userService.getAllUserGroups((err, groups) => {
        if(err) {
            return res.status(400).send(err.message);
        }
        return res.status(200).json(groups);
    });
};
