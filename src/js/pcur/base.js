angular.module('pcur-base', ['pcur-config', 'pcur-user'])
.controller('PcurCtrl', ['$scope', 'loading', 'config', 'user', function($scope, loading, config, user) {
    
    $scope.started = true;

    loading.watch(function(state) {
        $scope.loading = state;
    });

    config; user; // to force loading

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