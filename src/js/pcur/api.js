angular.module('pcur-api', ['pcur-config'])
.factory('api', ['router', function(router) {

    var routes = {
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

    return router(routes);

}])
.factory('router', ['$http', 'config', function($http, config) {

    var baseUrl = config.api;
    var knownMethods = ['GET', 'POST', 'PUT', 'DELETE', 'HEAD'];

    function parseRoutes(routes) {

        if (!isObj(routes)) {
            throw new Error('routes are not an object');
        }

        for (var r in routes) {
            var v = routes[r];
            if (isObj(v)) {
                parseRoutes(v);
            } else if (isString(v)) {
                routes[r] = parseRoute(v);
            } else {
                throw new Error('route is not a string');
            }
        }

        return routes;
    }

    function parseRoute(route) {
        var parts = route.split(' ');
        var method = parts[0];
        var uri = parts[1];

        if (!isHttpMethod(method)) {
            throw new Error('invalid method in ' + route);
        }

        return function() {
            var opts = baseOpts(arguments);

            opts.method = method;
            opts.url = parseUri(uri, arguments);

            return $http(opts);
        };
    }

    function baseOpts(args) {
        if (arguments.length === 0) {
            return {};
        }

        var last = args[arguments.length - 1];
        if (isObj(last)) {
            return last;
        }

        return {};
    }

    function parseUri(uri, args) {
        var parts = uri.split(/\{[^\}]+\}/);
        return parts.reduce(function(f, p, i) {
            return f + p + (args[i] || '');
        }, baseUrl);
    }

    function isObj(obj) {
        return Object.prototype.toString.call(obj) === '[object Object]';
    }
    function isString(obj) {
        return typeof obj === 'string';
    }
    function isHttpMethod(obj) {
        return isString(obj) && knownMethods.indexOf(obj) > -1;
    }

    return parseRoutes;
}]);










