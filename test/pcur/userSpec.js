describe("user", function() {

    var data;

    var called;
    var self;

    beforeEach(module('pcur-user'));

    beforeEach(module(function($provide) {

        called = false;

        data = {
            username: 'ceastwood'
        };

        self = function() {
            return {
                success: function(callback) { callback(data); }
            };
        };

        var api = {
            user: {
                self: function() {
                    called = true;
                    return self();
                }
            }
        };

        $provide.value('api', api);

    }));

    it("should try loading user at construction", inject(function(user) {

        expect(called).toBe(true);
        expect(user.isLoaded()).toBe(true);

    }));

    it("should not be loaded if user wasn't retrieved", inject(function($injector) {

        self = function() {
            return {
                success: function() {}
            };
        };

        var user = $injector.get('user');

        expect(user.isLoaded()).toBe(false);

    }));

});