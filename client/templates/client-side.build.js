angular.module("app").run(["$templateCache", function($templateCache) {$templateCache.put("header.html","<div class=\"s-header-button s-header-button-menu\" ng-class=\"{active: menu.isActive()}\" ng-click=\"menu.toggle()\"><i class=\"s-icon s-icon-menu\"></i></div>\n<div class=\"s-header-right-buttons\">\n    <div class=\"s-header-button s-header-button-user\" ng-click=\"user.showUser()\" user><i class=\"s-icon s-icon-user\" ng-class=\"{authenticated: user.isAuthenticated()}\"></i></div>\n</div>\n");
$templateCache.put("menu.html","<div class=\"s-menu-inner-wrapper\">\n    <ul class=\"s-menu-list\">\n\n        <li id=\"menu-item-search\" class=\"s-menu-list-item\" ui-sref-active=\"active expanded\">\n            <div class=\"s-menu-list-item-head\">\n                <a class=\"s-menu-list-item-head-link\" ui-sref=\"search\" ng-click=\"menu.toggleItem(\'search\')\">\n                    <span class=\"s-menu-list-item-head-link-icon\"><i class=\"s-icon s-icon-search\"></i></span>\n                    <span class=\"s-menu-list-item-head-link-label\">Поиск</span>\n                    <span class=\"s-menu-list-item-head-link-icon s-menu-list-item-head-link-icon-back\"><i class=\"s-icon s-icon-back\"></i></span>\n                </a>\n            </div>\n            <div class=\"s-menu-list-item-body\"></div>\n        </li>\n\n        <li id=\"menu-item-cabinet\" class=\"s-menu-list-item\" ui-sref-active=\"active expanded\">\n            <div class=\"s-menu-list-item-head\">\n                <a class=\"s-menu-list-item-head-link\" ui-sref=\"cabinet\" ng-click=\"menu.toggleItem(\'cabinet\')\">\n                    <span class=\"s-menu-list-item-head-link-icon\"><i class=\"s-icon s-icon-cabinet\"></i></span>\n                    <span class=\"s-menu-list-item-head-link-label\">Кабинет</span>\n                    <span class=\"s-menu-list-item-head-link-icon s-menu-list-item-head-link-icon-back\"><i class=\"s-icon s-icon-back\"></i></span>\n                </a>\n            </div>\n            <div class=\"s-menu-list-item-body\"></div>\n        </li>\n\n        <li id=\"menu-item-catalog\" class=\"s-menu-list-item\" ui-sref-active=\"active expanded\">\n            <div class=\"s-menu-list-item-head\">\n                <a class=\"s-menu-list-item-head-link\" ui-sref=\"catalog\" ng-click=\"menu.toggleItem(\'catalog\')\">\n                    <span class=\"s-menu-list-item-head-link-icon\"><i class=\"s-icon s-icon-catalog\"></i></span>\n                    <span class=\"s-menu-list-item-head-link-label\">Каталог</span>\n                    <span class=\"s-menu-list-item-head-link-icon s-menu-list-item-head-link-icon-back\"><i class=\"s-icon s-icon-back\"></i></span>\n                </a>\n            </div>\n            <div class=\"s-menu-list-item-body\"></div>\n        </li>\n\n        <li id=\"menu-item-collections\" class=\"s-menu-list-item\" ui-sref-active=\"active expanded\">\n            <div class=\"s-menu-list-item-head\">\n                <a class=\"s-menu-list-item-head-link\" ui-sref=\"collections\" ng-click=\"menu.toggleItem(\'collections\')\">\n                    <span class=\"s-menu-list-item-head-link-icon\"><i class=\"s-icon s-icon-collections\"></i></span>\n                    <span class=\"s-menu-list-item-head-link-label\">Коллекции</span>\n                    <span class=\"s-menu-list-item-head-link-icon s-menu-list-item-head-link-icon-back\"><i class=\"s-icon s-icon-back\"></i></span>\n                </a>\n            </div>\n            <div class=\"s-menu-list-item-body\"></div>\n        </li>\n\n        <li class=\"s-menu-list-item index\" ui-sref-active=\"hidden\">\n            <div class=\"s-menu-list-item-head\">\n                <a class=\"s-menu-list-item-head-link\" ui-sref=\"index\">\n                    <span class=\"s-menu-list-item-head-link-icon\"><i class=\"s-icon s-icon-home\"></i></span>\n                    <span class=\"s-menu-list-item-head-link-label\">Главная</span>\n                </a>\n            </div>\n        </li>\n\n    </ul>\n\n    <div class=\"s-menu-close\" ng-class=\"{active: menu.isActive()}\" ng-click=\"menu.toggle()\"></div>\n</div>\n");
$templateCache.put("content-pages/cabinet.html","<h1>Cabinet</h1>\n");
$templateCache.put("content-pages/catalog.html","<h1>Catalog</h1>");
$templateCache.put("content-pages/collections.html","<!DOCTYPE html>\n<html>\n<head lang=\"en\">\n    <meta charset=\"UTF-8\">\n    <title></title>\n</head>\n<body>\n\n</body>\n</html>");
$templateCache.put("popup-pages/auth.html","<div class=\"s-popup-auth\">\n    <form ng-submit=\"user.auth.submit()\">\n        <div class=\"s-popup-auth-message\" ng-class=\"user.auth.message.type\" ng-bind=\"user.auth.message.value\"></div>\n        <input type=\"email\" name=\"email\" placeholder=\"Email\" required ng-model=\"user.email\">\n        <input type=\"password\" name=\"password\" placeholder=\"Password\" required ng-model=\"user.password\" ng-disabled=\"user.auth.isRecovery()\">\n        <button>Отправить</button>\n        <div class=\"s-popup-auth-links\">\n            <a class=\"s-popup-auth-links-item\" ng-click=\"user.auth.toggleRecovery()\">{{ user.auth.isRecovery() ? \'Авторизоваться\' : \'Восстановить пароль\' }}</a>\n            <a class=\"s-popup-auth-links-item\">Соглашение</a>\n        </div>\n    </form>\n</div>\n");
$templateCache.put("popup-pages/popup-header.html","<span class=\"s-popup-header-name\" ng-bind=\"popupPage.popup.name\"></span>\n<div class=\"s-popup-header-button s-popup-header-button-close\" ng-click=\"popupPage.deactivate()\"><i class=\"s-icon s-icon-big s-icon-close\"></i></div>");
$templateCache.put("popup-pages/profile.html","<div class=\"s-popup-profile\"></div>");}]);