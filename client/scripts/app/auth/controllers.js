app.auth
    .controller('AuthCtrl', ['$scope', 'Auth', function ($scope, Auth) {
        $scope.auth = {
            state: false,
            getState: function () {
                return this.state;
            },
            toggleState: function () {
                this.state = !this.state;
            }
        };

        Auth.get()
            .$promise.then(function (res) {
                $scope.auth.state = res.state;
            });
    }]);
