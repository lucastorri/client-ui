angular.module('pcur', ['ngRoute', 'pcur-base', 'pcur-login', 'pcur-config', 'pcur-directives'])
.config(['$routeProvider', '$locationProvider', '$httpProvider', '$sceDelegateProvider', 'config', 'routes', function($routeProvider, $locationProvider, $httpProvider, $sceDelegateProvider, config, routes) {

    $locationProvider.html5Mode(true).hashPrefix('!');

    $routeProvider
    .when(routes.login, {
        templateUrl: '/template/login.html',
        controller: 'LoginCtrl',
        pageTitle: 'Login'
    })
    .otherwise({redirectTo: routes.root});

    $httpProvider.interceptors.push('httpInterceptor');

    $sceDelegateProvider.resourceUrlWhitelist(['self', config.api + '/**']);

}])
.factory('httpInterceptor', ['$q', '$location', 'routes', function($q, $location, routes) {

    var count = 0;
    
    return {
        request: function(config) {
            count++;
            console.log('loading');
            return config || $q.when(config);
        },
        response: function(response) {
            --count == 0 && console.log('finished loading');
            return response || $q.when(response);
        },
        responseError: function(rejection) {
            --count == 0 && console.log('finished loading');
            rejection.status == 403 && $location.path(routes.login);
            return $q.reject(rejection);
        }
    };

}]);