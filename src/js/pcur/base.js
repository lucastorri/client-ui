angular.module('pcur-base', ['pcur-user'])
.controller('PcurCtrl', ['$scope', 'loading', 'user', function($scope, loading, user) {

    $scope.started = true;

    loading.watch(function(state) {
        $scope.loading = state;
    });

    user;

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