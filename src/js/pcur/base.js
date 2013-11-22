angular.module('pcur-base', ['pcur-config'])
.controller('PcurCtrl', ['$scope', '$http', 'config', function($scope, $http, config) {

    $http.get(config.api + '/user/info');

}]);