describe("router", function() {

    var routes = {
        places: {
            create: 'POST /place',
            get: 'GET /place/{id}',
            update: 'PUT /place/{id}',
            del: 'DELETE /place/{id}'
        }
    };
    var config = {
        api: 'http://example.com'
    }
    
    var calls;

    beforeEach(module('pcur-api'));
    beforeEach(module('pcur-config'));

    beforeEach(function () {

        calls = [];
        var $http = function(opts) {
            calls.push(opts);
        }
        
        module(function ($provide) {
            $provide.value('$http', $http);
            $provide.value('config', config);
        });

    });
  
    it("should parse each route to use $http", inject(function(router) {

        var r = router(routes);

        r.places.create();
        expect(calls[0]).toEqual({ method: 'POST', url: 'http://example.com/place'});

    }));

    it("should allow the usage of extra parameters", function() {

    });

    it("should complain with invalid methods", function() {

    });

    function isFunction(obj) {
        return Object.prototype.toString.call(obj) === '[object Function]';
    }

});
