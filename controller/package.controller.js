'use strict';
const Mongoose = require('mongoose');
const PackageModel = Mongoose.model('Package');

function checkDuplicate(userId, trackingNumber) {
    return new Promise((resolve, reject) => {
        PackageModel.findOne({userId: userId, trackingNumber: trackingNumber}, (dbError, pkg) => {
           if(dbError) {
               reject(dbError);
           } else {
               resolve(pkg);
           }
        });
    });
}

exports.create = (req, res) => {
    const userId = req.body.userId;
    const tracking = req.body.trackingNumber;
    checkDuplicate(userId, tracking)
        .then((pkg) => {
            if(pkg) {
                let error = new Error();
                error.message = 'You already registered this package';
                reject(error);
            }
            const newPkg = new PackageModel({
                userId: userId,
                trackingNumber: tracking
            });
            newPkg.save((error) => {
                if(error) {
                    reject(error);
                } else {
                    return res.status(200).send();
                }
            });
        })
        .catch((e) => {
            //TODO add a message
            return res.status(400).send();
        });
};