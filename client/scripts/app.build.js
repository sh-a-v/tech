'use strict';

var
    app = angular.module('app', ['ui.router', 'ngResource', 'ngTouch', 'app.user', 'app.menu', 'app.popupPage']);

app
    .config( function ($stateProvider, $locationProvider, $resourceProvider) {
        $stateProvider
            .state('index', {
                url: '/'
                /*views: {
                    'viewMenu': { templateUrl: 'menu.html' }
                }*/
            })
            .state('search', {
                url: '/search/'
            })
            .state('cabinet', {
                url: '/cabinet/',
                templateUrl: 'content-pages/cabinet.html'
            })
            .state('catalog', {
                url: '/catalog/',
                templateUrl: 'content-pages/catalog.html'
            })
            .state('collections', {
                url: '/collections/',
                templateUrl: 'content-pages/collections.html'
            });

        $locationProvider
            .html5Mode(true);

        $resourceProvider
            .defaults.stripTrailingSlashes = false;
    });

angular.module("app").run(["$templateCache", function($templateCache) {$templateCache.put("header.html","<div class=\"s-header-button s-header-button-menu\" ng-click=\"menu.toggleState()\" ng-class=\"{active: menu.getState()}\"><i class=\"s-icon s-icon-menu\"></i></div>\n<!--<div class=\"s-header-logo\"><i class=\"s-icon s-icon-huge s-icon-logo\"></i></div>-->\n<div class=\"s-header-right-buttons\">\n    <div class=\"s-header-button s-header-button-user\" ng-click=\"user.showUser()\" user-button><i class=\"s-icon s-icon-user\" ng-class=\"{authenticated: user.isAuthenticated()}\"></i></div>\n</div>");
$templateCache.put("menu.html","<div class=\"s-menu-inner-wrapper\">\n    <ul class=\"s-menu-list\">\n\n        <li class=\"s-menu-list-item\" ui-sref-active=\"active\">\n            <div class=\"s-menu-list-item-head\" ng-click=\"menu.toggleItemState($event)\">\n                <a class=\"s-menu-list-item-head-link\" ui-sref=\"search\">\n                    <span class=\"s-menu-list-item-head-link-icon\"><i class=\"s-icon s-icon-search\"></i></span>\n                    <span class=\"s-menu-list-item-head-link-label\">Поиск</span>\n                </a>\n            </div>\n            <div class=\"s-menu-list-item-body\" menu-item-search></div>\n        </li>\n\n        <li class=\"s-menu-list-item\" ui-sref-active=\"active\">\n            <div class=\"s-menu-list-item-head\" ng-click=\"menu.toggleItemState($event)\">\n                <a class=\"s-menu-list-item-head-link\" ui-sref=\"cabinet\">\n                    <span class=\"s-menu-list-item-head-link-icon\"><i class=\"s-icon s-icon-cabinet\"></i></span>\n                    <span class=\"s-menu-list-item-head-link-label\">Кабинет</span>\n                </a>\n            </div>\n            <div class=\"s-menu-list-item-body\" menu-item-cabinet></div>\n        </li>\n\n        <li class=\"s-menu-list-item\" ui-sref-active=\"active\">\n            <div class=\"s-menu-list-item-head\" ng-click=\"menu.toggleItemState($event)\">\n                <a class=\"s-menu-list-item-head-link\" ui-sref=\"catalog\">\n                    <span class=\"s-menu-list-item-head-link-icon\"><i class=\"s-icon s-icon-catalog\"></i></span>\n                    <span class=\"s-menu-list-item-head-link-label\">Каталог</span>\n                </a>\n            </div>\n            <div class=\"s-menu-list-item-body\" menu-item-catalog></div>\n        </li>\n\n        <li class=\"s-menu-list-item\" ui-sref-active=\"active\">\n            <div class=\"s-menu-list-item-head\" ng-click=\"menu.toggleItemState($event)\">\n                <a class=\"s-menu-list-item-head-link\" ui-sref=\"collections\">\n                    <span class=\"s-menu-list-item-head-link-icon\"><i class=\"s-icon s-icon-collections\"></i></span>\n                    <span class=\"s-menu-list-item-head-link-label\">Коллекции</span>\n                </a>\n            </div>\n            <div class=\"s-menu-list-item-body\" menu-item-collections></div>\n        </li>\n\n    </ul>\n</div>");
$templateCache.put("content-pages/cabinet.html","<h1>Cabinet</h1>\n");
$templateCache.put("content-pages/catalog.html","<h1>Catalog</h1>");
$templateCache.put("content-pages/collections.html","<!DOCTYPE html>\n<html>\n<head lang=\"en\">\n    <meta charset=\"UTF-8\">\n    <title></title>\n</head>\n<body>\n\n</body>\n</html>");
$templateCache.put("popup-pages/auth.html","<div class=\"s-popup-auth\">\n    <form ng-submit=\"user.auth.submit()\">\n        <div class=\"s-popup-auth-message\" ng-class=\"user.auth.message.type\" ng-bind=\"user.auth.message.value\"></div>\n        <input type=\"email\" name=\"email\" placeholder=\"Email\" required ng-model=\"user.email\">\n        <input type=\"password\" name=\"password\" placeholder=\"Password\" required ng-model=\"user.password\" ng-disabled=\"user.auth.isRecovery()\">\n        <button>Отправить</button>\n        <div class=\"s-popup-auth-links\">\n            <a class=\"s-popup-auth-links-item\" ng-click=\"user.auth.toggleRecovery()\">{{ user.auth.isRecovery() ? \'Авторизоваться\' : \'Восстановить пароль\' }}</a>\n            <a class=\"s-popup-auth-links-item\">Соглашение</a>\n        </div>\n    </form>\n</div>\n");
$templateCache.put("popup-pages/header.html","<span ng-bind=\"popupPage.child.name\"></span>\n<div class=\"s-popup-page-head-button s-popup-page-head-button-close\" ng-click=\"popupPage.deactivateState()\"><i class=\"s-icon s-icon-big s-icon-close\"></i></div>");
$templateCache.put("popup-pages/profile.html","<div class=\"s-popup-profile\"></div>");}]);
app
    .controller('WindowSizeCtrl', ['$scope', '$window', function ($scope, $window) {
        $scope.windowSize = {
            width: null,
            height: null,
            isDesktopWidth: function () {
                return this.width > 1024
            },
            saveSize: function () {
                $scope.windowSize.width = $window.innerWidth;
                $scope.windowSize.height = $window.innerHeight;
            }
        };
    }])

    .controller('MainStateCtrl', ['$scope', function ($scope) {
        $scope.mainState = {
            el: null,
            initEl: function (el) {
                this.el = el;
            }
        }
    }])

    .controller('HeaderCtrl', ['$scope', function ($scope) {
        $scope.header = {

        };
    }]);
app
    .directive('resize', ['$window', function ($window) {
        return {
            restrict: 'A',
            controller: 'WindowSizeCtrl',
            link: function (scope, el, attrs) {
                var
                    windowSize = scope.windowSize;

                windowSize.saveSize();

                angular.element($window)
                    .on('resize', windowSize.saveSize);
            }
        };
    }])

    .directive('preload', ['$window', function ($window) {
        return {
            restrict: 'A',
            link: function (scope, el, attrs) {
                scope.$watch('$viewContentLoaded', function () {
                    el.removeClass('preload');
                });
            }
        }
    }])

    .directive('mainState', function () {
        return {
            restrict: 'A',
            controller: 'MainStateCtrl',
            link: function (scope, el, attrs) {
                var
                    mainState = scope.mainState,
                    windowSize = scope.windowSize,

                    desktopMenuClass = 'desktop-menu-active',
                    mobileMenuClass = 'mobile-menu-active';

                mainState.view = {
                    toggleMenu: function () {
                        if (windowSize.isDesktopWidth()) {
                            scope.menu.state.desktopActive ? el.addClass(desktopMenuClass) : el.removeClass(desktopMenuClass);
                        } else {
                            scope.menu.state.mobileActive ? el.addClass(mobileMenuClass) : el.removeClass(mobileMenuClass);
                        }
                    }
                };

                mainState.initEl(el);

                setTimeout(function () {
                    scope.$watch(scope.menu.getStateAsString, function() {
                        mainState.view.toggleMenu();
                    });
                }, 0);
            }
        }
    })

    .directive('headerView', function () {
        return {
            restrict: 'A',
            templateUrl: 'header.html',
            controller: 'HeaderCtrl'
        }
    });
app.menu = angular.module('app.menu', ['ui.router']);
app.popupPage = angular.module('app.popupPage', []);

app.user = angular.module('app.user', []);
/**
 * Controllers
 */

/**
 * Directives
 */
/**
 * Models
 */

/**
 * Services
 */

app.menu
    .controller('MenuCtrl', ['$scope', '$state', function ($scope, $state) {
        $scope.menu = {
            el: null,
            state: {
                desktopActive: true,
                mobileActive: false
            },
            item: {
                el: null,
                activeState: null
            },
            initEl: function (el) {
                this.el = el;
            },
            getState: function () {
                return $scope.windowSize.isDesktopWidth() ? this.state.desktopActive : this.state.mobileActive;
            },
            getStateAsString: function () {
                return JSON.stringify($scope.menu.state);
            },
            toggleState: function () {
                if ($scope.windowSize.isDesktopWidth()) {
                    this.state.desktopActive = !this.state.desktopActive;
                } else {
                    this.state.mobileActive = !this.state.mobileActive;
                }
            },
            setItemEl: function ($event) {
                this.item.el = angular.element($event.currentTarget).parent();
            },
            setItemState: function () {
                this.item.activeState = !$state.is('index');
            },
            getItemState: function () {
                return $scope.menu.item.activeState ? 'expanded' : 'collapsed';
            },
            toggleItemState: function ($event) {
                this.item.activeState = !this.item.activeState;
                this.setItemEl($event);
            }
        };
    }]);
app.menu
    .directive('menuView', ['$window', function ($window) {
        return {
            restrict: 'A',
            templateUrl: 'menu.html',
            controller: 'MenuCtrl',
            link: function (scope, el, attrs) {
                var
                    menu = scope.menu;

                menu.view = {
                    toggleMenuItem: function () {
                        if (menu.item && menu.item.el) {
                            menu.item.activeState ? menu.item.el.addClass('active') : menu.item.el.removeClass('active');
                        }
                    }
                };

                menu.initEl(el);

                setTimeout(function () {
                    menu.setItemState();

                    scope.$watch(menu.getItemState, function (state) {
                        menu.view.toggleMenuItem();
                    });
                }, 0);
            }
        };
    }])

    .directive('menuItemSearch', function () {
        return {
            restrict: 'A',
            controller: ''
        }
    })
    .directive('menuItemCabinet', function () {
        return {
            restrict: 'A',
            controller: ''
        }
    })
    .directive('menuItemCatalog', function () {
        return {
            restrict: 'A',
            controller: ''
        }
    })
    .directive('menuItemCollections', function () {
        return {
            restrict: 'A',
            controller: ''
        }
    });
app.popupPage
    .controller('PopupPageCtrl', ['$scope', function ($scope) {
        $scope.popupPage = {
            el: null,
            activeState: false,
            child: null,
            initEl: function (el) {
                this.el = el;
            },
            isActiveState: function () {
                return this.activeState;
            },
            activateState: function () {
                this.activeState = true;
            },
            deactivateState: function () {
                this.activeState = false;
                this.child.deactivateState();
            },
            toggleState: function () {
                this.activeState ? this.deactivateState() : this.activateState();
            },
            getState: function () {
                return $scope.popupPage.activeState ? 'visible' : 'hidden';
            },
            setChild: function (child) {
                this.child = child;
            }
        };
    }]);

app.popupPage
    .directive('popupPageState', function () {
        return {
            restrict: 'A',
            controller: 'PopupPageCtrl',
            link: function (scope, el, attrs) {
                var
                    popupPage = scope.popupPage;

                popupPage.view = {
                    animation: false,
                    isAnimation: function () {
                        return this.animation;
                    },
                    setAnimation: function () {
                        this.animation = true;
                        el.addClass('animation');
                    },
                    showPage: function () {
                        if ( !this.isAnimation() ) {
                            this.setAnimation();
                        }
                        popupPage.el.addClass('active');
                    },
                    hidePage: function () {
                        popupPage.el.removeClass('active')
                    },
                    togglePage: function () {
                        popupPage.activeState ? this.showPage() : this.hidePage();
                    }
                };

                popupPage.initEl(el);

                scope.$watch('$viewContentLoaded', function () {
                    setTimeout(function () {
                        //el.removeClass('hidden');
                    }, 500);
                });
                scope.$watch(popupPage.getState, function (state) {
                    popupPage.view.togglePage();
                });
            }
        }
    })

    .directive('popupHeaderView', function () {
        return {
            restrict: 'A',
            templateUrl: 'popup-pages/header.html'
        }
    });

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
                    defaultMessage: { value: '', type: 'default' },
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
                    this._set(this.list.defaultMessage);
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
                this.isRecovery() ? this.message.setValue(this.message.list.recoveryRequest) : this.message.clean();
            },

            activateState: function () {
                this.activeState = true;
                if ( !this.parent.isActiveState() )
                    this.parent.activateState();
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
                    .setValue($scope.user.isAuthenticated() ? this.message.list.successResponse : this.message.list.errorResponse);

                if ( $scope.user.isAuthenticated() )
                    this.parent.deactivateState();
            },
            _recoveryResponse: function (res) {
                this.message
                    .setValue(res.success ? this.message.list.successRecoveryResponse : this.message.list.errorRecoveryResponse);
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
                if ( !this.parent.isActiveState() )
                    this.parent.activateState();
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


app.user
    .factory('Auth', ['$resource', function ($resource) {
        return $resource('/auth/', null, {'update': { method: 'PUT' }});
    }]);