app.auth
    .factory('Auth', ['$resource', function ($resource) {
        return $resource('/api/auth/', {});
    }]);