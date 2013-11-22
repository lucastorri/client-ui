angular.module('pcur-base', [])
.controller('PcurCtrl', ['$scope', '$http', function($scope, $http) {

    $http.get(api + '/user/info');

}]);