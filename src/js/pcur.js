angular.module('pcur', ['ngRoute', 'pcur-base', 'pcur-login'])
.config(['$routeProvider', '$locationProvider', '$httpProvider', function($routeProvider, $locationProvider, $httpProvider) {

    $locationProvider.html5Mode(true).hashPrefix('!');

    $routeProvider
    .when('/login', {
        templateUrl: '/template/login.html',
        controller: 'LoginCtrl',
        pageTitle: 'Login'
    })
    .otherwise({redirectTo: '/'});

    $httpProvider.interceptors.push('httpInterceptor');

}])
.factory('httpInterceptor', ['$q', '$location', function($q, $location) {

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
            rejection.status == 403 && $location.path('/login');
            return $q.reject(rejection);
        }
    };

}]);