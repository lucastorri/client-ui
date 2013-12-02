angular.module('pcur', ['ngRoute', 'pcur-base', 'pcur-api', 'pcur-login', 'pcur-config', 'pcur-directives'])
.config(['$routeProvider', '$locationProvider', '$httpProvider', '$sceDelegateProvider', 'routesProvider', 'config', function($routeProvider, $locationProvider, $httpProvider, $sceDelegateProvider, routesProvider, config) {

    $locationProvider.html5Mode(true).hashPrefix('!');

    var paths = routesProvider.paths;

    $routeProvider
    .when(paths.login, {
        templateUrl: '/template/login.html',
        controller: 'LoginCtrl',
        pageTitle: 'Login'
    })
    .otherwise({ redirectTo: paths.root });

    $httpProvider.interceptors.push('httpInterceptor');

    $sceDelegateProvider.resourceUrlWhitelist(['self', config.api + '/**']);

}])
.factory('httpInterceptor', ['$q', '$location', 'loading', 'loginRoute', 'loginStatusCode', function($q, $location, loading, loginRoute, loginStatusCode) {

    var count = 0;
    
    return {
        request: function(config) {
            count++;
            loading.start();
            return config || $q.when(config);
        },
        response: function(response) {
            --count === 0 && loading.stop();
            return response || $q.when(response);
        },
        responseError: function(rejection) {
            --count === 0 && loading.stop();
            rejection.status === loginStatusCode && $location.path(loginRoute);
            return $q.reject(rejection);
        }
    };

}]);