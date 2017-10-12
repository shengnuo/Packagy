'use strict';

module.exports = ['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: './template/dash/dash.main.template.html',
            controller: 'dashCtrl'
        })
        .otherwise({
            redirect: '/'
        });
}];