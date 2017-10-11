'use strict';

const nodemailer = require('nodemailer');
const PackageModel = require('../repository/package.model');
const UserModel = require('../repository/user.model');

function getEmail (packageId) {
    return new Promise((resolve, reject) => {
        PackageModel.findOne({_id: packageId}, (err, pkg) => {
            if(err) {
                return reject(err);
            }
            return resolve(pkg.userId);
        })
    })
        .then((userId) => {
            return new Promise((resolve, reject) => {
                UserModel.findOne({_id: userId}, (err, user) => {
                    if(err) {
                        return reject(err);
                    }
                    if(!user) {
                        return reject(new Error('user not found'));
                    }
                    return resolve(user.email);
                });
            });
        });
}

exports.sendEmail = (pkg) => {
    let transporter = nodemailer.createTransport({
        host: 'smtp.live.com',
        port: 25,
        secure: false,
        auth: {
            user: 'example@mail.com',
            pass: 'password'
        }
    });

    getEmail(pkg._id)
        .then((email) => {
            return new Promise((resolve, reject) => {
                let mailOptions = {
                    from: 'shengnuo.lin@hotmail.com',
                    to: email,
                    subject: 'your package is here',
                    text: 'your package is here'
                };

                transporter.sendMail(mailOptions, (error, info) => {
                    if(error) {
                        return reject(error);
                    }
                    return resolve(info);

                });
            });
        });
};