menu
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