angular.module('pcur-base', ['pcur-config', 'pcur-user'])
.constant('routes', {
    root: '/',
    login: '/login'
})
.controller('PcurCtrl', ['$scope', '$http', 'config', 'user', function($scope, $http, config, user) {

}]);