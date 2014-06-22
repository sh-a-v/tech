app.user
    .factory('Auth', ['$resource', function ($resource) {
        return $resource('/auth/', {});
    }]);