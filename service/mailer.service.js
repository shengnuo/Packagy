'use strict';

const nodemailer = require('nodemailer');
const PackageModel = require('../repository/package.model');
const UserModel = require('../repository/user.model');

function getEmail (packageId) {
    return new Promise((resolve, reject) => {
        PackageModel.findOne({_id: packageId}, (err, pkg) => {
            if(err) {
                reject(err);
            }
            resolve(pkg.userId);
        })
    })
        .then((userId) => {
            return new Promise((resolve, reject) => {
                UserModel.findOne({_id: userId}, (err, user) => {
                    if(err) {
                        reject(err);
                    }
                    resolve(user.email);
                });
            });
        });
}

exports.sendEmail = (req, res) => {
    let transporter = nodemailer.createTransport({
        host: 'smtp.live.com',
        port: 25,
        secure: false,
        auth: {
            user: 'shengnuo.lin@hotmail.com',
            pass: 'MpGD=_7djo#E2&t]4jF#fq>7~'
        }
    });

    getEmail(req.body.packageId)
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
                        reject(error);
                    }
                    resolve();

                });
            })
        })
        .then(() => {
            res.status(200).send();
        })
        .catch((error) => {
            res.status(400).send();
        });
};