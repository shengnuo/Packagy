'use strict';

module.exports = ['$scope', '$http', '$base64', function ($scope, $http, $base64) {
    $scope.emailRegex = '[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$';

    $scope.user = null;

    $scope.signup = () => {
        $scope.errorMsg = '';

        let data = Object.assign(JSON.parse(JSON.stringify($scope.user)), {
            //encode password
            password: $base64.encode($scope.user.password),
            passwordRepeat: $base64.encode($scope.user.passwordRepeat)
        });

        $http({
            method: 'POST',
            url: '/api/user/signup',
            data: data,
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((response) => {
                console.log('Successfully registered!');
                //window.location = response.data.url;
            }, (err) => {
                $scope.errorMsg = err.message;
                // clear password
                $scope.user.password = $scope.user.passwordRepeat = null;
            });
    };
}];