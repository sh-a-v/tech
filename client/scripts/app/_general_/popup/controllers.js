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
