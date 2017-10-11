'use strict';
const angular = require('angular');
const fs = require('fs');

let jsDirectories = ['module', 'controller', 'directive', 'routing'];
// require modules for directories
jsDirectories.forEach((d) => {
    fs.readdirSync(__dirname + `/${d}`).forEach((file) => {
        require(`./${d}/` + file.substr(0, file.indexOf('.')) + `.${d}`);
    });
});
