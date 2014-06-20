app.auth
    .factory('Auth', ['$resource', function ($resource) {
        return $resource('/auth/', {});
    }]);