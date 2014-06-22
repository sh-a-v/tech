app.user
    .directive('userButton', function () {
        return {
            restrict: 'A',
            controller: 'UserCtrl'
        }
    })

    .directive('authView', function () {
        return {
            restrict: 'A',
            templateUrl: 'popup-pages/auth.html',
            controller: 'AuthCtrl',
            link: function (scope, el, attrs) {
                var
                    auth = scope.user.auth;

                auth.view = {
                    showForm: function () {
                        auth.el.addClass('active');
                    },
                    hideForm: function () {
                        auth.el.removeClass('active');
                    },
                    toggleForm: function () {
                        auth.activeState ? this.showForm() : this.hideForm();
                    }
                };

                auth.initEl(el);

                scope.$watch(auth.getState, function (state) {
                    auth.view.toggleForm();
                });
            }
        }
    })

    .directive('profileView', function () {
        return {
            restrict: 'A',
            templateUrl: 'popup-pages/profile.html',
            controller: 'ProfileCtrl',
            link: function (scope, el, attrs) {
                var
                    profile = scope.user.profile;

                profile.view = {
                    showForm: function () {
                        profile.el.addClass('active');
                    },
                    hideForm: function () {
                        profile.el.removeClass('active');
                    },
                    toggleForm: function () {
                        profile.activeState ? this.showForm() : this.hideForm();
                    }
                };

                profile.initEl(el);

                scope.$watch(profile.getState, function (state) {
                    profile.view.toggleForm();
                });
            }
        }
    });
