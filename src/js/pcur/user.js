angular.module('pcur-user', ['pcur-config', 'pcur-api'])
.factory('user', ['api', function(api) {

    var data;

    var user = {
        reload: function() {
            data = api.user.self();
        },
        isLoaded: function() {
            var loaded = false;
            this.data().success(function() {
                loaded = true;
            });
            return loaded;
        },
        data: function(callback) {
            callback && data.success(callback);
            return data;
        }
    };

    user.reload();
    return user;

}]);