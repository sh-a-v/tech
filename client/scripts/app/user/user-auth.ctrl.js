app.user.controller('AuthCtrl', ['$scope', 'Auth', function ($scope, Auth) {
  $scope.user.auth = {
    popup: {
      name: 'Авторизация'
    },

    active: false,
    recovery: false,

    initialize: function () {
      this.setEventListeners();
      this.checkAuthRequest();
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

    checkAuthRequest: function () {
      Auth.get().$promise
        .then(this._handleCheckAuthResponse.bind(this));
    },
    
    _handleCheckAuthResponse: function (res) {
      $scope.user.setUser(res.user);
    },

    loginRequest: function () {
      Auth.save({
          email: $scope.user.email,
          password: $scope.user.password
        }).$promise
        .then(this._handleLoginResponse.bind(this));
    },

    _handleLoginResponse: function (res) {
      var authentication = res.authentication;

      $scope.user.setUser(res.user);

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
        .then(this._handleRecoveryResponse.bind(this));
    },

    _handleRecoveryResponse: function (res) {
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
