describe("router", function() {

    var calls;
    var routes;

    beforeEach(module('pcur-api'));

    beforeEach(function () {

        routes = {
            places: {
                create: 'POST /place',
                get: 'GET /place/{id}',
                del: 'DELETE /place/{id}/something/{id}/else'
            },
            user: {
                self: 'GET /user/self'
            }
        };

        var i = 0;
        calls = [];
        var $http = function(opts) {
            calls.push(opts);
            return i++;
        };
        
        module(function ($provide) {
            $provide.value('$http', $http);
            $provide.value('config', {
                api: 'http://example.com'
            });
        });

    });
  
    it("should parse each route to use $http", inject(function(router) {

        var r = router(routes);

        expect(r.places.create()).toBe(0);
        expect(r.places.get(321)).toBe(1);
        expect(r.places.del(123, 321)).toBe(2);
        expect(r.user.self()).toBe(3);

        expect(calls[0]).toEqual({ method: 'POST', url: 'http://example.com/place' });
        expect(calls[1]).toEqual({ method: 'GET', url: 'http://example.com/place/321' });
        expect(calls[2]).toEqual({ method: 'DELETE', url: 'http://example.com/place/123/something/321/else' });
        expect(calls[3]).toEqual({ method: 'GET', url: 'http://example.com/user/self' });

    }));

    it("should allow the usage of extra parameters", inject(function(router) {

        var r = router(routes);

        r.places.create({ data: '{"name": "newPlace"}' });
        r.places.get(123, { headers: { Accept: 'application/json' } });

        expect(calls[0]).toEqual({ method: 'POST', url: 'http://example.com/place', data: '{"name": "newPlace"}' });
        expect(calls[1]).toEqual({ method: 'GET', url: 'http://example.com/place/123', headers: { Accept: 'application/json' } });

    }));

    it("should complain with invalid methods", inject(function(router) {

        expect(function() {

            router({ r: 'INVALID_METHOD /hello' });

        }).toThrow(new Error('invalid method in INVALID_METHOD /hello'));

    }));

});
