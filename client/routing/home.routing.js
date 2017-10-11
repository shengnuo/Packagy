'use strict';

module.exports = ['$routeProvider', function ($routeProvider) {
    console.log('configuring routing for home');
    $routeProvider
        .when('/login', {
            templateUrl: './template/home/login.template.html',
            controller: 'loginCtrl'
        })
        .when('/signup', {
            templateUrl: './template/home/signup.template.html',
            controller: 'signUpCtrl'
        })
        .otherwise({
            templateUrl: './template/home/login.template.html',
            controller: 'loginCtrl'
        });
}];