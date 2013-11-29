angular.module('pcur-api', ['pcur-config', 'pcur-router'])
.factory('api', ['router', function(router) {

    var api = {
        places: {
            create: 'POST /place',
            get: 'GET /place/{id}',
            update: 'PUT /place/{id}',
            del: 'DELETE /place/{id}'
        },
        user: {
            self: 'GET /user/self'
        }
    };

    return router.backend(api);

}]);
