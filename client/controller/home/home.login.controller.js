'use strict';

module.exports = ['$scope', '$http', '$base64', function ($scope, $http, $base64) {
    console.log('loginCtrl');
    $scope.emailRegex = '[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$';
    $scope.user = null;

    $scope.login = () => {
        let data = Object.assign(JSON.parse(JSON.stringify($scope.user)),{
            // encode password
            password: $base64.encode($scope.user.password),
        });

        $scope.errorMsg = '';

        $http({
            url:'/api/user/login',
            data: data,
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST'
        }).then((res) => {
            //window.location = res.data.url;
            console.log('login successful');
        }, (err) => {
            console.log(err.message);
            $scope.errorMsg = err.message;
            $scope.user.password = null;
        });

    };
}];