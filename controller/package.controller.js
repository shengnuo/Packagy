'use strict';
const Mongoose = require('mongoose');
const PackageModel = Mongoose.model('Package');
const mailer = require('../service/mailer.service');

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
        //validate
        PackageModel.findOne({_id: packageId}, (error, pkg) => {
            if(error) {
                return reject(error);
            }
            if(!pkg) {
                return reject(new Error('package not found'));
            }
            if(pkg.status != 'open') {
                return reject(new Error('cannot resolve or delete a non-opened package'));
            }
            resolve(pkg);
        })
    })
        .then((pkg) => {
            return new Promise((resolve, reject) => {
                PackageModel.findOneAndUpdate(pkg._id,
                    {'$set': {
                        closedDate: new Date(),
                        status: status
                    }},
                    (error, result) => {
                        if(error) {
                            reject(error);
                        }
                        resolve(pkg);
                    });
            });
        })

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
        .then((pkg) => {
            mailer.sendEmail(pkg);
        })
        .then((info) => {
            res.status(200).send('package resolved');
        })
        .catch((error) => {
            res.status(400).send(error.message);
        });
};

exports.delete = (req, res) => {
    closePackage(req.body.packageId, 'deleted')
        .then((pkg) => {
            res.status(200).send('package deleted');
        })
        .catch((error) => {
            res.status(400).send(error.message);
        })
};