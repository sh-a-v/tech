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
