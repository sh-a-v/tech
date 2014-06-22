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
