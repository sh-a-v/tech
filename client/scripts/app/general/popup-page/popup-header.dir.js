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
