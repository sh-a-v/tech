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
