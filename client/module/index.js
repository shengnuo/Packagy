'use strict';

require('angular-route');
require('angular-animate');
require('angular-aria');
require('angular-material');
require('angular-base64');

const angular = require('angular');

angular.module('home', ['ngRoute', 'ngAnimate','ngAria','ngMaterial', 'base64']);
angular.module('dash', ['ngRoute', 'ngAnimate','ngAria','ngMaterial']);