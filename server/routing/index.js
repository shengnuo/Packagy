'use strict';
const fs = require('fs');

module.exports = (app, passport) => {
  fs.readdirSync(__dirname + '/route').forEach((file) => {
      require('./route/'
          + file.substr(0, file.indexOf('.'))
          + '.routes')(app, passport);
  });
};