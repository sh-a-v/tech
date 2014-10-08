'use strict';

var app = angular.module('app', ['ui.router', 'ngResource', 'ngTouch', 'app.user']);

app.config( function ($stateProvider, $locationProvider, $resourceProvider) {
  $stateProvider
    .state('index', {
      url: '/',
      title: 'Engineerium'
    })
    .state('search', {
      url: '/search',
      title: 'Поиск'
    })
    .state('cabinet', {
      url: '/cabinet',
      templateUrl: 'content-pages/cabinet.html',
      title: 'Кабинет'
    })
    .state('catalog', {
      url: '/catalog',
      templateUrl: 'content-pages/catalog.html',
      title: 'Каталог'
    })
    .state('collections', {
      url: '/collections',
      templateUrl: 'content-pages/collections.html',
      title: 'Коллекции'
    });

  $locationProvider
    .html5Mode({
      enabled: true,
      requireBase: false
    });

  $resourceProvider
    .defaults.stripTrailingSlashes = true;
});

app.controller('AppContainerCtrl', ['$scope', '$state', function ($scope, $state) {
  $scope.appContainer = {
    initialize: function () {
      this.setEventListeners();
    },

    setEventListeners: function () {

    },

    getCurrentStateTitle: function () {
      return $state.current.title;
    }
  };

  var self = $scope.appContainer;

  self.initialize();
}]);

app.directive('appContainer', function () {
  return {
    restrict: 'EA',
    controller: 'AppContainerCtrl',
    link: function (scope, el, attrs) {
      scope.appContainer.view = {
        appContainerEl: el,

        initialize: function () {
          this.setEventListeners();
        },

        setEventListeners: function () {

        }
      };

      var self = scope.appContainer.view;

      self.initialize();
    }
  }
});

app.controller('PreloadCtrl', ['$scope', function ($scope) {
  $scope.preload = {
    active: true,

    initialize: function () {
      this.setEventListeners();
    },

    setEventListeners: function () {
      $scope.$on('$viewContentLoaded', this.deactivate.bind(this));
    },

    activate: function () {
      if (this.isActive()) {
        return;
      }

      this.active = true;
      this._broadcastPreloadActivated();
    },

    deactivate: function () {
      if (!this.isActive()) {
        return;
      }

      this.active = false;
      this._broadcastPreloadDeactivated();
    },

    isActive: function () {
      return this.active;
    },

    _broadcastPreloadActivated: function () {
      $scope.$broadcast('preload:activated');
    },

    _broadcastPreloadDeactivated: function () {
      $scope.$broadcast('preload:deactivated');
    }
  };

  var self = $scope.preload;

  self.initialize();
}]);

app.directive('preload', ['$window', function ($window) {
  return {
    restrict: 'EA',
    controller: 'PreloadCtrl',
    link: function (scope, el, attrs) {
      scope.preload.view = {
        preloadEl: el,

        initialize: function () {

        },

        setEventListeners: function () {
          scope.$on('preload:activated', this.showPreload.bind(this));
          scope.$on('preload:deactivated', this.hidePreload.bind(this));
        },

        showPreload: function () {
          this.preloadEl.addClass('active');
        },

        hidePreload: function () {
          this.preloadEl.removeClass('active');
        }
      };

      var self = scope.preload.view;

      self.initialize();
    }
  }
}]);

app.controller('WindowSizeCtrl', ['$rootScope', '$scope', '$window', function ($rootScope, $scope, $window) {
  $scope.windowSize = {
    width: null,
    height: null,

    initialize: function () {
      this.setEventListeners();
      this.saveSize();
    },

    setEventListeners: function () {
      $scope.$on('window:resized', this.saveSize.bind(this));
    },

    isDesktopWidth: function () {
      return this.width > 1024;
    },

    saveSize: function () {
      this.width = $window.innerWidth;
      this.height = $window.innerHeight;

      this._broadcastWindowSizeChanged();
    },

    _broadcastWindowSizeChanged: function () {
      $scope.$broadcast('windowSize:changed');
    }
  };

  var self = $scope.windowSize;

  self.initialize();
}]);

app.directive('windowSize', ['$window', function ($window) {
  return {
    restrict: 'A',
    controller: 'WindowSizeCtrl',
    link: function (scope, el, attrs) {
      scope.windowSize.view = {
        initialize: function () {
          this.setEventListeners();
        },

        setEventListeners: function () {
          angular.element($window).on('resize', _.throttle(this._broadcastWindowResized, 300).bind(this));
        },

        _broadcastWindowResized: function () {
          scope.$broadcast('window:resized');
        }
      };

      var self = scope.windowSize.view;

      self.initialize();
    }
  };
}]);

app.controller('ContentPageCtrl', ['$rootScope', '$scope', function ($rootScope, $scope) {
  $scope.contentPage = {
    shift: false,

    initialize: function () {
      this.setEventListeners();
    },

    setEventListeners: function () {
      $scope.$on('menu:toggled', this.toggleShift.bind(this));
      $scope.$on('windowSize:changed', this.unsetShift.bind(this));
    },

    setShift: function () {
      if (this.isShifted()) {
        return;
      }

      this.shift = true;
      this._broadcastContentPageShiftSet();
    },

    unsetShift: function () {
      if (!this.isShifted()) {
        return;
      }

      this.shift = false;
      this._broadcastContentPageShiftUnset();
    },

    toggleShift: function () {
      this.isShifted() ? this.unsetShift() : this.setShift();
    },

    isShifted: function () {
      return this.shift;
    },

    _broadcastContentPageShiftSet: function () {
      $scope.$broadcast('contentPage:shiftSet');
    },

    _broadcastContentPageShiftUnset: function () {
      $scope.$broadcast('contentPage:shiftUnset');
    }
  };

  var self = $scope.contentPage;

  self.initialize();
}]);

app.directive('contentPage', function () {
  return {
    restrict: 'EA',
    controller: 'ContentPageCtrl',
    link: function (scope, el, attrs) {
      scope.contentPage.view = {
        contentPageEl: el,

        desktopShiftValue: -150,
        tabletAndPhoneShiftValue: 300,

        initialize: function () {
          this.setEventListeners();
        },

        setEventListeners: function () {
          scope.$on('contentPage:shiftSet', this.shift.bind(this));
          scope.$on('contentPage:shiftUnset', this.reverseShift.bind(this));
        },

        shift: function () {
          var translateXValue = scope.windowSize.isDesktopWidth() ? this.desktopShiftValue : this.tabletAndPhoneShiftValue;

          Velocity(this.contentPageEl, {
            translateX: translateXValue,
            translateZ: 0
          }, {
            duration: 250,
            easing: 'easy-out'
          });
        },

        reverseShift: function () {
          Velocity(this.contentPageEl, 'reverse', {
            duration: 250,
            easing: 'easy-out'
          });
        }
      };

      var self = scope.contentPage.view;

      self.initialize();
    }
  };
});

app.controller('HeaderCtrl', ['$scope', function ($scope) {
  $scope.header = {
    initilaize: function () {
      this.setEventListeners();
    },

    setEventListeners: function () {

    }
  };

  var self = $scope.header;

  self.initilaize();
}]);

app.directive('header', function () {
  return {
    restrict: 'EA',
    templateUrl: 'header.html',
    controller: 'HeaderCtrl',
    link: function (scope, el, attrs) {
      scope.header.view = {
        initialize: function () {
          this.setEventListeners();
        },

        setEventListeners: function () {

        }
      };

      var self = scope.header.view;

      self.initialize();
    }
  };
});

app.controller('MenuCtrl', ['$scope', '$state', function ($scope, $state) {
  $scope.menu = {
    active: $scope.windowSize.isDesktopWidth() ? true : false,

    initialize: function () {
      this.setEventListeners();
    },

    setEventListeners: function () {
      $scope.$on('windowSize:changed', this.setDefaultState.bind(this));
    },

    setDefaultState: function () {
      $scope.windowSize.isDesktopWidth() ? this.activate() : this.deactivate();
    },

    activate: function () {
      if (this.isActive()) {
        return;
      }

      this.active = true;
      this._broadcastMenuActivated();
    },

    deactivate: function () {
      if (!this.isActive()) {
        return;
      }

      this.active = false;
      this._broadcastMenuDeactivated();
    },

    toggle: function () {
      this.isActive() ? this.deactivate() : this.activate();
      this._broadcastMenuToggled();
    },

    toggleItem: function (itemName) {
      if ($state.$current.name === itemName) {
        this._broadcastMenuItemToggled(itemName);
      }
    },

    isActive: function () {
      return this.active;
    },

    _broadcastMenuActivated: function () {
      $scope.$broadcast('menu:activated');
    },

    _broadcastMenuDeactivated: function () {
      $scope.$broadcast('menu:deactivated');
    },

    _broadcastMenuToggled: function () {
      $scope.$broadcast('menu:toggled');
    },

    _broadcastMenuItemToggled: function (itemName) {
      $scope.$broadcast('menu:itemToggled', itemName);
    }
  };

  var self = $scope.menu;

  self.initialize();
}]);

app.directive('menu', ['$window', function ($window) {
  return {
    restrict: 'EA',
    templateUrl: 'menu.html',
    controller: 'MenuCtrl',
    link: function (scope, el, attrs) {
      scope.menu.view = {
        menuEl: el,
        menuItemEls: {
          search: angular.element(document.getElementById('menu-item-search')),
          cabinet: angular.element(document.getElementById('menu-item-cabinet')),
          catalog: angular.element(document.getElementById('menu-item-catalog')),
          collections: angular.element(document.getElementById('menu-item-collections'))
        },

        desktopShiftValue: -300,
        tabletAndPhoneShiftValue: 300,

        initialize: function () {
          this.setEventListeners();
        },

        setEventListeners: function () {
          scope.$on('menu:activated', this.show.bind(this));
          scope.$on('menu:deactivated', this.hide.bind(this));
          scope.$on('menu:itemToggled', this.toggleItemEl.bind(this));
        },

        show: function () {
          scope.windowSize.isDesktopWidth() ? this.reverseShift() : this.shift();
        },

        hide: function () {
          scope.windowSize.isDesktopWidth() ? this.shift() : this.reverseShift();
        },

        shift: function () {
          var translateXValue = scope.windowSize.isDesktopWidth() ? this.desktopShiftValue : this.tabletAndPhoneShiftValue;
          var opacityValue = scope.windowSize.isDesktopWidth() ? 0 : 1;

          Velocity(this.menuEl, {
            translateX: translateXValue,
            translateZ: 0,
            opacity: opacityValue
          }, {
            duration: 400,
            easing: 'easy-out',
            display: 'inline-block'
          });
        },

        reverseShift: function () {
          Velocity(this.menuEl, 'reverse', {
            duration: 400,
            easing: 'easy-out'
          });
        },

        toggleItemEl: function (e, itemName) {
          var itemEl = this.menuItemEls[itemName];
          itemEl.toggleClass('expanded');
        }
      };

      var self = scope.menu.view;

      self.initialize();
    }
  };
}]);

app.controller('PopupHeaderCtrl', ['$scope', function ($scope) {
  $scope.popupHeader = {
    initilaize: function () {
      this.setEventListeners();
    },

    setEventListeners: function () {

    }
  };

  var self = $scope.popupHeader;

  self.initilaize();
}]);

app.directive('popupHeader', function () {
  return {
    restrict: 'EA',
    templateUrl: 'popup-pages/popup-header.html',
    controller: 'PopupHeaderCtrl',
    link: function (scope, el, attrs) {
      scope.popupHeader.view = {
        initialize: function () {
          this.setEventListeners();
        },

        setEventListeners: function () {

        }
      };

      var self = scope.popupHeader.view;

      self.initialize();
    }
  };
});

app.controller('PopupPageCtrl', ['$scope', function ($scope) {
  $scope.popupPage = {
    active: false,
    popup: null,

    initialize: function () {
      this.setEventListeners();
    },

    setEventListeners: function () {
      $scope.$on('popup:activated', this.activate.bind(this));
      $scope.$on('popup:deactivated', this.deactivate.bind(this));
    },

    activate: function (e, popup) {
      if (this.isActive()) {
        return;
      }

      this.active = true;
      this.popup = popup;
      this._broadcastPopupPageActivated();
    },

    deactivate: function () {
      if (!this.isActive()) {
        return;
      }

      this.active = false;
      this.popup = null;
      this._broadcastPopupPageDeactivated();
    },

    toggle: function () {
      this.isActive() ? this.deactivate() : this.activate();
    },

    isActive: function () {
      return this.active;
    },

    _broadcastPopupPageActivated: function () {
      $scope.$broadcast('popupPage:activated');
    },

    _broadcastPopupPageDeactivated: function () {
      $scope.$broadcast('popupPage:deactivated');
    }
  };

  var self = $scope.popupPage;

  self.initialize();
}]);

app.directive('popupPage', function () {
  return {
    restrict: 'EA',
    controller: 'PopupPageCtrl',
    link: function (scope, el, attrs) {
      scope.popupPage.view = {
        popupPageEl: el,

        initialize: function () {
          this.setEventListeners();
        },

        setEventListeners: function () {
          scope.$on('popupPage:activated', this.show.bind(this));
          scope.$on('popupPage:deactivated', this.hide.bind(this));
        },

        show: function () {
          Velocity(this.popupPageEl, {
            opacity: 1
          }, {
            display: 'inline-block',
            duration: 200
          });
        },

        hide: function () {
          Velocity(this.popupPageEl, 'reverse', {
            display: 'none',
            duration: 200
          });
        }
      };

      var self = scope.popupPage.view;

      self.initialize();
    }
  }
});

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

app.user.controller('AuthCtrl', ['$scope', 'Auth', function ($scope, Auth) {
  $scope.user.auth = {
    popup: {
      name: 'Авторизация'
    },

    active: false,
    recovery: false,

    initialize: function () {
      this.setEventListeners();
      this.checkRequest();
    },

    setEventListeners: function () {

    },

    message: {
      value: '',
      type: 'default',
      list: {
        defaultMessage: { value: '', type: 'default' },
        successResponse: { value: 'Вы успешно авторизованы', type: 'success' },
        errorResponse: { value: 'Вы неверно ввели пароль', type: 'error' },
        recoveryRequest: { value: 'Вам будет выслан новый пароль', type: 'warning' },
        successRecoveryResponse: { value: 'Новый пароль выслан', type: 'success' },
        errorRecoveryResponse: { value: 'Email адрес не верен или не найден', type: 'error' }
      },

      setValue: function (m) {
        this._set(m);
      },

      _set: function (m) {
        this.value = m.value;
        this.type = m.type;
      },

      clean: function () {
        this._set(this.list.defaultMessage);
      }
    },

    activate: function () {
      if (this.isActive()) {
        return;
      }

      this.active = true;
      this._broadcastUserAuthActivated();
    },

    deactivate: function () {
      if (!this.isActive()) {
        return;
      }

      this.active = false;
      this._broadcastUserAuthDeactivated();
    },

    toggle: function () {
      this.isActive() ? this.deactivate() : this.activate();
    },

    toggleRecovery: function () {
      this.recovery = !this.recovery;

      this.isRecovery() ? this.message.setValue(this.message.list.recoveryRequest) : this.message.clean();
    },

    submit: function () {
      this.isRecovery() ? this.recoveryRequest() : this.loginRequest();
    },

    checkRequest: function () {
      Auth.get().$promise
        .then(this._checkResponse.bind(this));
    },
    
    _checkResponse: function (res) {
      $scope.user.authentication = res.authentication;
    },

    loginRequest: function () {
      Auth.save({
          email: $scope.user.email,
          password: $scope.user.password
        }).$promise
        .then(this._loginResponse(res).bind(this));
    },

    _loginResponse: function (res) {
      var authentication = res.authentication;
      $scope.user.authentication = authentication;

      var message = authentication ? this.message.list.successResponse : this.message.list.errorResponse;
      this.message.setValue(message);

      if (authentication) {
        this.deactivate();
      }
    },

    recoveryRequest: function () {
      Auth.update({
          email: $scope.user.email,
          recovery: true
        }).$promise
        .then(this._recoveryResponse(res).bind(this));
    },

    _recoveryResponse: function (res) {
      var message = res.success ? this.message.list.successRecoveryResponse : this.message.list.errorRecoveryResponse;
      this.message.setValue(message);
    },

    isActive: function () {
      return this.active;
    },

    isRecovery: function () {
      return this.recovery;
    },

    _broadcastUserAuthActivated: function () {
      $scope.$broadcast('user:authActivated');
      $scope.$broadcast('popup:activated', this.popup);
    },

    _broadcastUserAuthDeactivated: function () {
      $scope.$broadcast('user:authDeactivated');
      $scope.$broadcast('popup:deactivated');
    }
  };

  var self = $scope.user.auth;

  self.initialize();
}]);

app.user.directive('auth', function () {
  return {
    restrict: 'EA',
    templateUrl: 'popup-pages/auth.html',
    controller: 'AuthCtrl',
    link: function (scope, el, attrs) {
      scope.user.auth.view = {
        authEl: el,

        initialize: function () {
          this.setEventListeners();
        },

        setEventListeners: function () {
          scope.$on('user:authActivated', this.show.bind(this));
          scope.$on('user:authDeactivated', this.hide.bind(this));
        },

        show: function () {
          Velocity(this.authEl, {
            top: 0
          }, {
            display: 'inline-block',
            duration: 300
          });
        },

        hide: function () {
          Velocity(this.authEl, 'reverse', {
            display: 'none',
            duration: 300
          });
        }
      };

      var self = scope.user.auth.view;

      self.initialize();
    }
  }
});

app.user.controller('ProfileCtrl', ['$scope', function ($scope) {
  $scope.user.profile = {
    popup: {
      name: 'Профиль'
    },

    active: false,

    initialize: function () {
      this.setEventListeners();
    },

    setEventListeners: function () {

    },

    activate: function () {
      if (this.isActive()) {
        return;
      }

      this.active = true;
      this._broadcastUserProfileActivated();
    },

    deactivate: function () {
      if (!this.isActive()) {
        return;
      }

      this.active = false;
      this._broadcastUserProfileDeactivated();
    },

    toggleState: function () {
      this.activeState ? this.deactivateState() : this.activateState();
    },

    getState: function () {
      return $scope.user.profile.activeState ? 'visible' : 'hidden';
    },

    isActive: function () {
      return this.active;
    },

    _broadcastUserProfileActivated: function () {
      $scope.$broadcast('user:profileActivated');
      $scope.$broadcast('popup:activated', this.popup);
    },

    _broadcastUserProfileDeactivated: function () {
      $scope.$broadcast('user:profileDeactivated');
      $scope.$broadcast('popup:deactivated');
    }
  }
}]);

app.user.directive('profile', function () {
  return {
    restrict: 'EA',
    templateUrl: 'popup-pages/profile.html',
    controller: 'ProfileCtrl',
    link: function (scope, el, attrs) {
      scope.user.profile.view = {
        profileEl: el,

        initialize: function () {
          this.setEventListeners();
        },

        setEventListeners: function () {
          scope.$on('user:profileActivated', this.show.bind(this));
          scope.$on('user:profileDeactivated', this.hide.bind(this));
        },

        show: function () {
          Velocity(this.profileEl, {
            top: 0
          }, {
            display: 'inline-block',
            duration: 300,
            easing: 'easy-out'
          });
        },

        hide: function () {
          Velocity(this.profileEl, 'reverse', {
            display: 'none',
            duration: 300,
            easing: 'easy-out'
          });
        }
      };

      var self = scope.user.profile.view;

      self.initialize();
    }
  }
});

app.user.controller('UserCtrl', ['$scope', function ($scope) {
  $scope.user = {
    authentication: false,

    initialize: function () {
      this.setEventListeners();
    },

    setEventListeners: function () {
      $scope.$on('popupPage:deactivated', this.hideUser.bind(this));
    },

    isAuthenticated: function () {
      return this.authentication;
    },

    showUser: function () {
      this.isAuthenticated() ? this.profile.activate() : this.auth.activate();
    },

    hideUser: function () {
      this.isAuthenticated() ? this.profile.deactivate() : this.auth.deactivate();
    }
  };

  var self = $scope.user;

  self.initialize();
}]);

app.user.directive('user', function () {
  return {
    restrict: 'EA',
    controller: 'UserCtrl'
  }
});

app.user
  .factory('Auth', ['$resource', function ($resource) {
    return $resource('/auth/', null, {'update': { method: 'PUT' }});
  }]);
