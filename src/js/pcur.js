angular.module('pcur', ['ngRoute', 'pcur-base', 'pcur-login'])
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $locationProvider.html5Mode(true).hashPrefix('!');

    $routeProvider
    .when('/login', {
        templateUrl: '/template/login.html',
        controller: 'LoginCtrl',
        pageTitle: 'Login'
    })
    .otherwise({redirectTo: '/'});

    console.log('hello world');

}]);