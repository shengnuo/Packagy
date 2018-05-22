'use strict';

let home = require('angular').module('home');
home.controller('signUpCtrl', require('./home.signup.controller'));
home.controller('loginCtrl', require('./home.login.controller'));
home.controller('homeCtrl', require('./home.main.controller'));