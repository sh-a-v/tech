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