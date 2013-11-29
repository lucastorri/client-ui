describe("router", function() {

    var calls;

    beforeEach(module('pcur-router'));

    beforeEach(function () {

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
  
    it("backend should parse each route to use $http", inject(function(router) {

        var r = router.backend({
            places: {
                create: 'POST /place',
                get: 'GET /place/{id}',
                del: 'DELETE /place/{id}/something/{id}/else'
            },
            user: {
                self: 'GET /user/self'
            }
        });

        expect(r.places.create()).toBe(0);
        expect(r.places.get(321)).toBe(1);
        expect(r.places.del(123, 321)).toBe(2);
        expect(r.user.self()).toBe(3);

        expect(calls[0]).toEqual({ method: 'POST', url: 'http://example.com/place' });
        expect(calls[1]).toEqual({ method: 'GET', url: 'http://example.com/place/321' });
        expect(calls[2]).toEqual({ method: 'DELETE', url: 'http://example.com/place/123/something/321/else' });
        expect(calls[3]).toEqual({ method: 'GET', url: 'http://example.com/user/self' });

    }));

    it("backend should allow the usage of extra parameters", inject(function(router) {

        var r = router.backend({
            create: 'POST /place',
            get: 'GET /place/{id}',
        });

        r.create({ data: '{"name": "newPlace"}' });
        r.get(123, { headers: { Accept: 'application/json' } });

        expect(calls[0]).toEqual({ method: 'POST', url: 'http://example.com/place', data: '{"name": "newPlace"}' });
        expect(calls[1]).toEqual({ method: 'GET', url: 'http://example.com/place/123', headers: { Accept: 'application/json' } });

    }));

    it("backend should complain with invalid methods", inject(function(router) {

        expect(function() {

            router.backend({ r: 'INVALID_METHOD /hello' });

        }).toThrow(new Error('invalid method in INVALID_METHOD /hello'));

    }));

    it("frontend should parse routes", inject(function(router) {

        var r = router.frontend({
            login: '/login',
            place: {
                create: '/place/new',
                edit: '/place/{ppid}'
            }
        });

        expect(r.login.base).toEqual('/login');
        expect(r.place.create.base).toEqual('/place/new');
        expect(r.place.edit.base).toEqual('/place/{ppid}');

        expect(r.login()).toEqual('/login');
        expect(r.place.create()).toEqual('/place/new');
        expect(r.place.edit(456)).toEqual('/place/456');

    }));

});
