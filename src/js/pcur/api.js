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

    var knownMethods = ['GET', 'POST', 'PUT', 'DELETE', 'HEAD'];

    function parseRoutes(routes, parseRoute) {

        if (!isObj(routes)) {
            throw new Error('routes are not an object');
        }

        for (var r in routes) {
            var v = routes[r];
            if (isObj(v)) {
                parseRoutes(v, parseRoute);
            } else if (isString(v)) {
                routes[r] = parseRoute(v);
            } else {
                throw new Error('route is not a string');
            }
        }

        return routes;
    }

    function parseInternalRoute(uri) {
        var f = function() {
            return parseUri(uri, arguments, '');
        };
        f.base = uri;
        return f;
    }

    function parseExternalRoute(route) {
        var parts = route.split(' ');
        var method = parts[0];
        var uri = parts[1];

        if (!isHttpMethod(method)) {
            throw new Error('invalid method in ' + route);
        }

        return function() {
            var args = Array.prototype.slice.call(arguments, 0);
            var opts = baseOpts(args);

            opts.method = method;
            opts.url = parseUri(uri, args, config.api);

            return $http(opts);
        };
    }

    function baseOpts(args) {
        if (arguments.length === 0) {
            return {};
        }

        var last = args[args.length - 1];
        if (isObj(last)) {
            return args.pop();
        }

        return {};
    }

    function parseUri(uri, args, baseUrl) {
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

    return {
        backend: function(routes) {
            return parseRoutes(routes, parseExternalRoute);
        },
        frontend: function(routes) {
            return parseRoutes(routes, parseInternalRoute);
        }
    };
}]);










