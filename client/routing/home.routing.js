'use strict';

module.exports = ['$routeProvider', function ($routeProvider) {
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
            redirect: '/'
        });
}];