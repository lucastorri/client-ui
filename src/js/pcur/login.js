angular.module('pcur-login', ['pcur-user', 'pcur-api', 'pcur-base'])
.controller('LoginCtrl', ['$scope', '$location', 'user', 'routes', 'loading', function($scope, $location, user, routes, loading) {

    user.data(function() {
        $location.path(routes.root());
    });

    $scope.returnTo = loading.returnTo;

}]);