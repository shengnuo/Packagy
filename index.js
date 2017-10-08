'use strict';

const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const password = require('password');
const swig = require('swig');

var server = express();

//injecting middleware
server.use(session({
    secret: 'secret',
    resave: false
}));
server.use(express.static('server'));
server.use(password.initialize());
server.use(bodyParser.urlencoded({
    extended: true
}));
server.use(bodyParser.json());
server.use(passport.session());

//db
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://PackagyDev:Packagy@ds115085.mlab.com:15085/packagy');

//src routing
require('./src/routing')(server, passport);

server.listen(8081);