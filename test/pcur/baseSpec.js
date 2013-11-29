describe("loading", function() {

    beforeEach(module('pcur-base'));

    it("should start as not loading", inject(function(loading) {

        expect(loading.isLoading()).toBe(false);

    }));

    it("should keep status", inject(function(loading) {

        loading.start();
        expect(loading.isLoading()).toBe(true);

        loading.stop();
        expect(loading.isLoading()).toBe(false);

    }));

    it("should notify watchers", inject(function(loading) {

        var states = [];
        loading.watch(function(state) {
            states.push(state);
        });

        loading.start();
        loading.stop();

        expect(states).toEqual([false, true, false]);

    }));


});