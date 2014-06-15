app.popupPage
    .controller('PopupPageCtrl', ['$scope', function ($scope) {
        $scope.popupPage = {
            el: null,
            initEl: function (el) {
                this.el = el;
            }
        };
    }]);
