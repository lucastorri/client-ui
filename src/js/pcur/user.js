angular.module('pcur-user', ['pcur-config'])
.factory('user', ['$http', 'config', function($http, config) {

    var data;

    var user = {
        reload: function() {
            data = $http.get(config.api + '/user/self');
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