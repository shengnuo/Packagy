'use strict';

//dashCtrl
module.exports = ['$scope', '$http', function ($scope, $http) {
    $http.get('api/package/my_packages').then((response) => {
        console.log(response.data);
       $scope.packages = response.data;
    });

}];