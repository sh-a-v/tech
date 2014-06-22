app.user
    .controller('UserCtrl', ['$scope', function ($scope) {
        $scope.user = {
            authentication: false,
            isAuthenticated: function () {
                return this.authentication;
            },
            showUser: function () {
                this.isAuthenticated() ? this.profile.toggleState() : this.auth.toggleState();
            }
        };
    }])

    .controller('AuthCtrl', ['$scope', 'Auth', function ($scope, Auth) {
        $scope.user.auth = {
            el: null,
            name: 'Авторизация',
            activeState: false,
            parent: $scope.popupPage,
            initEl: function (el) {
                this.el = el;
            },
            activateState: function () {
                this.activeState = true;
                if ( !this.parent.isActiveState() ) this.parent.activateState();
                this.parent.setChild(this);
            },
            deactivateState: function () {
                this.activeState = false;
            },
            toggleState: function () {
                this.activeState ? this.deactivateState() : this.activateState();
            },
            getState: function () {
                return $scope.user.auth.activeState ? 'visible' : 'hidden';
            },
            submit: function () {
                Auth.save({ email: $scope.user.email, password: $scope.user.password })
                    .$promise.then(function (res) {
                        $scope.user.authentication = res.authentication;
                        $scope.user.auth.checkSubmitResponse(res);
                    });
            },
            checkSubmitResponse: function (res) {
                if ( $scope.user.isAuthenticated() ) {
                    this.parent.deactivateState();
                }
            }
        };

        Auth.get()
            .$promise.then(function (res) {
                $scope.user.authentication = res.authentication;
            });
    }])

    .controller('ProfileCtrl', ['$scope', function ($scope) {
        $scope.user.profile = {
            el: null,
            name: 'Профиль',
            activeState: false,
            parent: $scope.popupPage,
            initEl: function (el) {
                this.el = el;
            },
            activateState: function () {
                this.activeState = true;
                if ( !this.parent.isActiveState() ) this.parent.activateState();
                this.parent.setChild(this);
            },
            deactivateState: function () {
                this.activeState = false;
            },
            toggleState: function () {
                this.activeState ? this.deactivateState() : this.activateState();
            },
            getState: function () {
                return $scope.user.profile.activeState ? 'visible' : 'hidden';
            }
        }
    }]);
