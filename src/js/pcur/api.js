angular.module('pcur-api', ['pcur-router'])
.constant('loginRoute', '/login')
.constant('loginStatusCode', 403)
.provider('routes', ['loginRoute', function(loginRoute) {

    this.paths = {
        root: '/',
        login: loginRoute
    };

    this.$get = ['router', function(router) {
        return router.frontend(this.paths);
    }];

}])
.provider('api', function() {

    this.paths = {
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

    this.$get = ['router', function(router) {
        return router.backend(this.paths);
    }];

});
