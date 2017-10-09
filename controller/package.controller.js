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

function closePackage(packageId, status) {
    return new Promise((resolve, reject) => {
        PackageModel.findOneAndUpdate(packageId,
            {'$set': {
                closedDate: new Date(),
                status: status
            }},
            (error, result) => {
                if(error) {
                    reject(error);
                }
                resolve();
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

exports.resolve = (req, res) => {
    closePackage(req.body.packageId, 'resolved')
        .then(() => {
            //TODO add a mail sender
            res.status(200).send();
        });
};

exports.delete = (req, res) => {
    closePackage(req.body.packageId, 'deleted')
        .then(() => {
            res.status(200).send();
        });
};