'use strict';

exports.auth = (req, res, cb) => {
    if(req.session.userId && req.session.userId != '') {
        return cb();
    } else {
        //TODO add redirection
        res.status(400).send('Session not found');
    }
}