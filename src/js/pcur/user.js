angular.module('pcur-user', ['pcur-config', 'pcur-api'])
.factory('user', ['api', function(api) {

    var data;

    var user = {
        reload: function() {
            data = api.user.self();
        },
        isLoaded: function() {
            return data;
        },
        data: function(callback) {
            if (!data) {
                this.reload();
            }

            callback && data.success(callback);

            return data;
        }
    };

    user.reload();
    return user;

}]);