angular.module('pcur-base', ['pcur-user', 'pcur-api', 'pcur-config'])
.controller('PcurCtrl', ['$scope', 'loading', 'origin', 'user', 'api', 'routes', function($scope, loading, origin, user, api, routes) {

    $scope.started = true;

    loading.watch(function(state) {
        $scope.loading = state;
    });

    $scope.origin = origin;
    $scope.user = user;
    $scope.api = api;
    $scope.routes = routes;

}])
.service('loading', function() {

    var watchers = [];
    var loading = false;

    function notify(state) {
        if (loading !== state) {
            loading = state;
            watchers.forEach(function(watcher) {
                watcher(loading);
            });
        }
    }

    return {
        returnTo: '',
        start: function() {
            notify(true);
        },
        stop: function() {
            notify(false);
        },
        watch: function(watcher) {
            if (watcher) {
                watchers.push(watcher);
                watcher(loading);
            }
        },
        isLoading: function() {
            return loading;
        }
    };

});