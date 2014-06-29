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
            recovery: false,
            parent: $scope.popupPage,

            message: {
                value: '',
                type: 'default',
                list: {
                    default: { value: '', type: 'default' },
                    successResponse: { value: 'Вы успешно авторизованы', type: 'success' },
                    errorResponse: { value: 'Вы неверно ввели пароль', type: 'error' },
                    recoveryRequest: { value: 'Вам будет выслан новый пароль', type: 'warning' },
                    successRecoveryResponse: { value: 'Новый пароль выслан', type: 'success' },
                    errorRecoveryResponse: { value: 'Пользователь не найден', type: 'error' }
                },
                setValue: function (m) {
                    this._set(m);
                },
                clean: function () {
                    this._set(this.list.default);
                },
                _set: function (m) {
                    this.value = m.value;
                    this.type = m.type;
                }
            },

            initEl: function (el) {
                this.el = el;
            },

            isRecovery: function () {
                return this.recovery;
            },
            toggleRecovery: function () {
                this.recovery = !this.recovery;
                this.isRecovery() ? this.message.setValue( this.message.list.recoveryRequest ) : this.message.clean();
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
                this.isRecovery() ? this._recoveryRequest() : this._loginRequest();
            },
            _loginRequest: function () {
                Auth.save({
                        email: $scope.user.email,
                        password: $scope.user.password
                    })
                    .$promise.then(function (res) {
                        $scope.user.authentication = res.authentication;
                        $scope.user.auth._loginResponse(res);
                    });
            },
            _recoveryRequest: function () {
                Auth.update({
                        email: $scope.user.email,
                        recovery: true
                    })
                    .$promise.then(function (res) {
                        $scope.user.auth._recoveryResponse(res);
                    });
            },
            _loginResponse: function (res) {
                this.message
                    .setValue( $scope.user.isAuthenticated() ? this.message.list.successResponse : this.message.list.errorResponse );

                if ( $scope.user.isAuthenticated() ) this.parent.deactivateState();
            },
            _recoveryResponse: function (res) {
                this.message
                    .setValue( res.success ? this.message.list.successRecoveryResponse : this.message.list.errorRecoveryResponse );
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
